# Produktbilder mit Imgur URLs hinzufügen

## So laden Sie Bilder auf Imgur hoch und verwenden sie für Ihre Produkte

### 1. Bilder auf Imgur hochladen

1. Gehen Sie zu [https://imgur.com](https://imgur.com)
2. Klicken Sie auf "New post" oder "Upload images"
3. Laden Sie Ihr Produktbild hoch
4. Nach dem Upload, **Rechtsklick** auf das Bild → "Copy image address" / "Bildadresse kopieren"
5. Die URL sollte etwa so aussehen: `https://i.imgur.com/abc123.jpg`

### 2. Bild-URL zu einem Produkt hinzufügen

#### Option A: Über die API (mit cURL)

```bash
# Produkt ID finden (ersetzen Sie {product-id} mit der echten ID)
curl http://localhost:3000/api/products

# Bild hinzufügen
curl -X PATCH http://localhost:3000/api/products/{product-id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "images": [
      {
        "url": "https://i.imgur.com/IHR-BILD.jpg",
        "alt": "Produktbeschreibung",
        "isPrimary": true
      }
    ]
  }'
```

#### Option B: Mit Node.js Skript

Erstellen Sie eine Datei `update-product-image.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateProductImage() {
  // PRODUKT NAME HIER ANPASSEN
  const productName = 'TEST';

  // IHRE IMGUR URL HIER EINFÜGEN
  const imgurUrl = 'https://i.imgur.com/abc123.jpg';

  const product = await prisma.product.findFirst({
    where: { name: productName },
    include: { images: true },
  });

  if (!product) {
    console.log('Produkt nicht gefunden!');
    return;
  }

  // Update oder erstelle Bild
  if (product.images.length > 0) {
    await prisma.productImage.update({
      where: { id: product.images[0].id },
      data: { url: imgurUrl },
    });
  } else {
    await prisma.productImage.create({
      data: {
        productId: product.id,
        url: imgurUrl,
        isPrimary: true,
      },
    });
  }

  console.log(`✅ Bild aktualisiert für: ${productName}`);
  await prisma.$disconnect();
}

updateProductImage();
```

Ausführen mit: `node update-product-image.js`

#### Option C: Über Prisma Studio (Am einfachsten!)

```bash
npx prisma studio
```

1. Öffnet sich im Browser unter `http://localhost:5555`
2. Gehen Sie zur Tabelle `product_images`
3. Suchen Sie das Bild für Ihr Produkt oder erstellen Sie ein neues
4. Fügen Sie die Imgur-URL in das Feld `url` ein
5. Setzen Sie `isPrimary` auf `true`
6. Speichern

### 3. Mehrere Bilder für ein Produkt

Sie können mehrere Bilder hinzufügen. Das erste Bild mit `isPrimary: true` wird als Hauptbild angezeigt.

```bash
curl -X PATCH http://localhost:3000/api/products/{product-id} \
  -H "Content-Type: application/json" \
  -d '{
    "images": [
      {
        "url": "https://i.imgur.com/hauptbild.jpg",
        "alt": "Hauptansicht",
        "isPrimary": true
      },
      {
        "url": "https://i.imgur.com/detail1.jpg",
        "alt": "Detailansicht 1",
        "isPrimary": false
      },
      {
        "url": "https://i.imgur.com/detail2.jpg",
        "alt": "Detailansicht 2",
        "isPrimary": false
      }
    ]
  }'
```

### 4. Bild-URLs Format

Verwenden Sie **direkte Imgur-Links**:
- ✅ Richtig: `https://i.imgur.com/abc123.jpg`
- ❌ Falsch: `https://imgur.com/abc123` (ohne i. und ohne .jpg)

### 5. Alle Produktbilder auf einmal aktualisieren

Ich habe ein Skript vorbereitet: `update-all-images.js`

Passen Sie die URLs an und führen Sie aus: `node update-all-images.js`

## Beispiel: Echtes Produkt mit Imgur

```bash
# 1. Laden Sie Ihr Produktbild auf Imgur hoch
# 2. Kopieren Sie die direkte URL (z.B. https://i.imgur.com/xyz789.jpg)
# 3. Führen Sie aus:

node update-product-image.js
# oder direkt in der Datenbank via Prisma Studio
```

## Vorteile von Imgur

- ✅ Kostenlos
- ✅ Schnell
- ✅ Zuverlässig
- ✅ Keine Größenlimits
- ✅ Direkte Bild-URLs
