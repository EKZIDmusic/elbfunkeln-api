/* eslint-disable */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Auto-Fix Skript für ESLint/Prettier/TypeScript Probleme
 * Verwendung: node fix-problems.js
 */

class CodeFixer {
  constructor(projectRoot) {
    this.projectRoot = projectRoot || process.cwd();
    this.srcPath = path.join(this.projectRoot, 'src');
  }

  // Führt ESLint mit --fix auf allen TypeScript-Dateien aus
  runEslintFix() {
    console.log('🔧 Führe ESLint --fix aus...');
    try {
      execSync(`npx eslint "${this.srcPath}/**/*.ts" --fix`, {
        cwd: this.projectRoot,
        stdio: 'inherit',
      });
      console.log('✅ ESLint Fix abgeschlossen');
    } catch (err) {
      console.log('⚠️  ESLint Fix abgeschlossen (mit Warnungen)');
    }
  }

  // Führt Prettier auf allen Dateien aus
  runPrettierFix() {
    console.log('🔧 Führe Prettier --write aus...');
    try {
      execSync(`npx prettier "${this.srcPath}/**/*.ts" --write`, {
        cwd: this.projectRoot,
        stdio: 'inherit',
      });
      console.log('✅ Prettier Fix abgeschlossen');
    } catch (err) {
      console.error('❌ Prettier Fehler:', err.message);
    }
  }

  // Behebt fehlende UserRole/OrderStatus Importe
  fixMissingPrismaImports() {
    console.log('🔧 Behebe fehlende Prisma Enums...');

    const files = this.getAllTypeScriptFiles(this.srcPath);
    let fixedCount = 0;

    files.forEach((file) => {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;

      // Prüfe ob UserRole oder OrderStatus verwendet wird aber nicht importiert
      if (
        content.includes('UserRole') &&
        !content.includes('import { UserRole }') &&
        !content.includes('import type { UserRole }')
      ) {
        // Füge Import hinzu oder erweitere bestehenden Prisma Import
        if (content.includes("from '@prisma/client'")) {
          content = content.replace(
            /import\s+{([^}]+)}\s+from\s+'@prisma\/client'/,
            (match, imports) => {
              if (!imports.includes('UserRole')) {
                return `import { ${imports.trim()}, UserRole } from '@prisma/client'`;
              }
              return match;
            },
          );
        } else {
          // Füge neuen Import am Anfang hinzu
          const lines = content.split('\n');
          const firstImportIndex = lines.findIndex((l) => l.startsWith('import'));
          if (firstImportIndex >= 0) {
            lines.splice(firstImportIndex, 0, "import { UserRole } from '@prisma/client';");
            content = lines.join('\n');
          }
        }
        modified = true;
      }

      if (
        content.includes('OrderStatus') &&
        !content.includes('import { OrderStatus }') &&
        !content.includes('import type { OrderStatus }')
      ) {
        if (content.includes("from '@prisma/client'")) {
          content = content.replace(
            /import\s+{([^}]+)}\s+from\s+'@prisma\/client'/,
            (match, imports) => {
              if (!imports.includes('OrderStatus')) {
                return `import { ${imports.trim()}, OrderStatus } from '@prisma/client'`;
              }
              return match;
            },
          );
        } else {
          const lines = content.split('\n');
          const firstImportIndex = lines.findIndex((l) => l.startsWith('import'));
          if (firstImportIndex >= 0) {
            lines.splice(firstImportIndex, 0, "import { OrderStatus } from '@prisma/client';");
            content = lines.join('\n');
          }
        }
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`  ✅ ${path.relative(this.projectRoot, file)}`);
      }
    });

    console.log(`✅ ${fixedCount} Dateien mit fehlenden Prisma Imports behoben`);
  }

  // Behebt unsafe any Probleme durch Type-Annotations
  fixUnsafeAnyAccess() {
    console.log('🔧 Füge Type Annotations für user.userId hinzu...');

    const files = this.getAllTypeScriptFiles(this.srcPath);
    let fixedCount = 0;

    files.forEach((file) => {
      let content = fs.readFileSync(file, 'utf8');
      let modified = false;

      // Füge UserPayload Interface hinzu falls es fehlt
      if (content.includes('@CurrentUser()') && !content.includes('UserPayload')) {
        // Prüfe ob eine user payload definition existiert
        const needsUserPayload = content.match(/@CurrentUser\(\)\s+user:/);

        if (needsUserPayload && !content.includes('interface UserPayload')) {
          // Füge UserPayload Interface nach den Imports hinzu
          const lines = content.split('\n');
          const lastImportIndex = lines.reduce(
            (last, line, idx) => (line.trim().startsWith('import') ? idx : last),
            -1,
          );

          if (lastImportIndex >= 0) {
            const userPayloadDef = `
interface UserPayload {
  userId: string;
  email: string;
  role: string;
}
`;
            lines.splice(lastImportIndex + 1, 0, userPayloadDef);
            content = lines.join('\n');
            modified = true;
          }
        }

        // Ersetze user: any mit user: UserPayload
        content = content.replace(
          /@CurrentUser\(\)\s+user:\s+any/g,
          '@CurrentUser() user: UserPayload',
        );

        // Oder wenn kein Type angegeben ist
        content = content.replace(
          /@CurrentUser\(\)\s+user(?=[,\)])/g,
          '@CurrentUser() user: UserPayload',
        );

        modified = true;
      }

      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`  ✅ ${path.relative(this.projectRoot, file)}`);
      }
    });

    console.log(`✅ ${fixedCount} Dateien mit Type Annotations behoben`);
  }

  // Behebt tsconfig.json Probleme
  fixTsConfig() {
    console.log('🔧 Behebe tsconfig.json Probleme...');

    const tsconfigFiles = [
      path.join(this.projectRoot, 'tsconfig.json'),
      path.join(this.projectRoot, 'tsconfig.build.json'),
    ];

    let fixedCount = 0;

    tsconfigFiles.forEach((file) => {
      if (!fs.existsSync(file)) {
        return;
      }

      let content = fs.readFileSync(file, 'utf8');
      let modified = false;

      // Fix: "nodenext" -> "NodeNext" (case-sensitive!)
      if (content.includes('"nodenext"')) {
        content = content.replace(/"nodenext"/g, '"NodeNext"');
        modified = true;
        console.log(`  ✅ Fixed module: "nodenext" -> "NodeNext"`);
      }

      // Fix: "ES2023" -> "ES2022" (ES2023 ist noch nicht offiziell supported)
      if (content.includes('"ES2023"')) {
        content = content.replace(/"ES2023"/g, '"ES2022"');
        modified = true;
        console.log(`  ✅ Fixed target: "ES2023" -> "ES2022"`);
      }

      // Alternative: ESNext statt ES2023
      // content = content.replace(/"ES2023"/g, '"ESNext"');

      if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`  ✅ ${path.relative(this.projectRoot, file)}`);
      }
    });

    if (fixedCount === 0) {
      console.log('  ℹ️  Keine tsconfig Probleme gefunden');
    } else {
      console.log(`✅ ${fixedCount} tsconfig Dateien behoben`);
    }
  }

  // Hilfsfunktion: Alle TypeScript-Dateien rekursiv finden
  getAllTypeScriptFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        results = results.concat(this.getAllTypeScriptFiles(filePath));
      } else if (file.endsWith('.ts') && !file.endsWith('.spec.ts')) {
        results.push(filePath);
      }
    });

    return results;
  }

  // Hauptfunktion: Alle Fixes ausführen
  fixAll() {
    console.log('🚀 Starte Auto-Fix für Projekt:', this.projectRoot);
    console.log('');

    // 1. Erst TypeScript Config Fixes
    this.fixTsConfig();
    console.log('');

    // 2. Dann die spezifischen Code-Fixes
    this.fixMissingPrismaImports();
    console.log('');

    this.fixUnsafeAnyAccess();
    console.log('');

    // 3. Dann ESLint (behebt viele Probleme automatisch)
    this.runEslintFix();
    console.log('');

    // 4. Zuletzt Prettier (für finale Formatierung)
    this.runPrettierFix();
    console.log('');

    console.log('✨ Alle Fixes abgeschlossen!');
    console.log('');
    console.log('📝 Nächste Schritte:');
    console.log('   1. Überprüfe die Änderungen mit git diff');
    console.log('   2. Teste deine Anwendung');
    console.log('   3. Führe npm run lint aus, um verbleibende Probleme zu sehen');
  }
}

// Skript ausführen
if (require.main === module) {
  const projectRoot = process.argv[2] || process.cwd();
  const fixer = new CodeFixer(projectRoot);
  fixer.fixAll();
}

module.exports = CodeFixer;
