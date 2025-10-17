# Frontend Prompt für Claude.ai - Bild-Upload in Shop-Verwaltung

Kopieren Sie diesen Prompt und fügen Sie ihn in Claude.ai ein:

---

## Prompt für Frontend-Entwicklung

Hallo Claude! Ich möchte die **Bild-Upload-Funktionalität** in meine Shop-Verwaltung (Admin-Panel) integrieren.

### Aktueller Stand:

**Backend (API) ist fertig und bietet folgende Endpoints:**

```
POST   /api/admin/products/:id/images/upload
GET    /api/admin/products/:id/images
DELETE /api/admin/products/:productId/images/:imageId
GET    /api/images/:imageId (öffentlich - zeigt das Bild an)
```

**Upload-Endpoint Details:**
- **Content-Type:** multipart/form-data
- **Authentifizierung:** Bearer Token (JWT)
- **Parameter:**
  - `file` (required) - Die Bilddatei
  - `alt` (optional) - Alternativer Text
  - `isPrimary` (optional) - true/false für Hauptbild

**Response-Format:**
```json
{
  "id": "uuid",
  "url": "/api/images/uuid",
  "alt": "Beschreibung",
  "isPrimary": true,
  "mimeType": "image/jpeg",
  "createdAt": "2025-10-17T..."
}
```

### Aktuelle Frontend-Struktur:

Die Shop-Verwaltung hat:
1. Eine **Produktverwaltung** mit Produktliste
2. Für jedes Produkt gibt es einen **"Bearbeiten"** Button
3. Es gibt eine **erweiterte Produktansicht** mit allen Produktdetails

**Screenshots zeigen:**
- Produktliste mit Thumbnails
- "Bearbeiten" Button für jedes Produkt
- Erweiterte Ansicht mit Produktdetails

### Was ich benötige:

Bitte erstelle für die **erweiterte Produktverwaltung** (die Card-Ansicht mit Bearbeiten-Button):

#### 1. Bild-Upload-UI-Komponente

- **Datei-Upload-Bereich** mit Drag & Drop oder File-Input
- **Bild-Vorschau** der hochgeladenen Datei (vor dem Upload)
- **Upload-Button** mit Progress-Indicator
- **Alt-Text Input-Feld**
- **Hauptbild-Checkbox** (isPrimary)

#### 2. Aktuelle Bilder anzeigen

- **Liste aller Bilder** des Produkts
- **Thumbnail-Vorschau** jedes Bildes
- Markierung des **Hauptbildes** (Primary)
- **Löschen-Button** für jedes Bild
- **Hauptbild setzen** Button (falls nicht Primary)

#### 3. Funktionen implementieren

```javascript
// Upload-Funktion
async function uploadProductImage(productId, file, alt, isPrimary) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('alt', alt || '');
  formData.append('isPrimary', isPrimary ? 'true' : 'false');

  const response = await fetch(`/api/admin/products/${productId}/images/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}` // JWT Token
    },
    body: formData
  });

  return response.json();
}

// Bilder abrufen
async function getProductImages(productId) {
  const response = await fetch(`/api/admin/products/${productId}/images`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return response.json();
}

// Bild löschen
async function deleteProductImage(productId, imageId) {
  const response = await fetch(`/api/admin/products/${productId}/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return response.json();
}
```

#### 4. UI/UX Anforderungen

- **Visuelles Feedback:** Loading-Spinner während Upload
- **Erfolgs-/Fehlermeldungen:** Toast-Notifications
- **Validierung:**
  - Max. Dateigröße: 5 MB
  - Erlaubte Formate: JPG, PNG, GIF, WebP
  - Nur Bilddateien erlauben
- **Responsive Design:** Funktioniert auf Desktop & Mobile
- **Drag & Drop:** Bilder per Drag & Drop hochladen können

#### 5. Integration in bestehendes Design

Bitte passe das Design an mein aktuelles Theme an:
- Farbschema: Beige/Braun-Töne (wie in den Screenshots)
- Buttons: Abgerundete Buttons mit Icons
- Cards: Mit Schatten und abgerundeten Ecken
- Typography: Sauber und lesbar

### Technischer Stack (falls relevant):

Bitte erstelle die Lösung mit:
- ✅ **Vanilla JavaScript** oder **React** (deine Wahl)
- ✅ **Fetch API** für HTTP-Requests
- ✅ **FormData** für File-Uploads
- ✅ **Responsive CSS** oder **Tailwind** (wenn vorhanden)

### Zusätzliche Features (optional):

- 📸 **Bild-Preview** vor dem Upload
- 🔄 **Reihenfolge ändern** (Drag & Drop der Bilder)
- ✂️ **Bild-Cropping** vor dem Upload (optional)
- 📊 **Upload-Fortschritt** in Prozent anzeigen

### Erwartetes Ergebnis:

Eine **vollständige, funktionsfähige UI-Komponente**, die ich in meine bestehende Shop-Verwaltung integrieren kann. Die Komponente sollte:

1. ✅ Bilder hochladen können
2. ✅ Alle Bilder eines Produkts anzeigen
3. ✅ Bilder löschen können
4. ✅ Hauptbild markieren können
5. ✅ Responsive und benutzerfreundlich sein

### Code-Struktur:

Bitte liefere:
- HTML-Template für die Upload-Komponente
- JavaScript-Code für die API-Calls
- CSS für das Styling (passend zum aktuellen Design)
- Integrations-Anweisungen (wo und wie einfügen)

### Beispiel Integration:

Die Komponente sollte in der **erweiterten Produktansicht** erscheinen, z.B.:

```html
<div class="product-detail-card">
  <h2>Produktname</h2>
  <p>Beschreibung...</p>

  <!-- HIER SOLL DIE BILD-UPLOAD-KOMPONENTE EINGEFÜGT WERDEN -->
  <div id="product-image-manager"></div>

  <button>Speichern</button>
</div>
```

---

Kannst du mir bitte diese UI-Komponente erstellen? Vielen Dank! 🙏

---

## Zusätzliche Informationen (falls Claude nachfragt):

**API Base URL:** `http://localhost:3000` (oder deine Domain)

**Authentifizierung:**
```javascript
// Token aus localStorage holen
const token = localStorage.getItem('authToken');

// Bei jedem Request mitsenden
headers: {
  'Authorization': `Bearer ${token}`
}
```

**Bildanzeige:**
```html
<!-- Bilder werden so angezeigt: -->
<img src="http://localhost:3000/api/images/{image-id}" alt="Produktbild">
```

**Fehlermeldungen:**
- 400: Ungültige Datei (zu groß oder falsches Format)
- 401: Nicht authentifiziert
- 404: Produkt nicht gefunden
- 413: Datei zu groß

---

**Viel Erfolg! 🚀**
