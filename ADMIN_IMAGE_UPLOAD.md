# Admin Bild-Upload für Produkte

## Neue Admin-Endpoints für Bild-Upload

Die Shop-Verwaltung unterstützt jetzt **direkte Bild-Uploads**! Bilder werden als BLOB in der MariaDB gespeichert.

### 1. Bild hochladen

**Endpoint:** `POST /api/admin/products/:id/images/upload`

**Benötigt:** JWT-Token (ADMIN oder SHOP_OWNER)

**Beispiel mit cURL:**

```bash
# Mit lokaler Datei
curl -X POST http://localhost:3000/api/admin/products/{PRODUCT_ID}/images/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/pfad/zu/ihrem/bild.jpg" \
  -F "alt=Produktbeschreibung" \
  -F "isPrimary=true"
```

**Response:**
```json
{
  "id": "image-uuid",
  "url": "/api/images/image-uuid",
  "alt": "Produktbeschreibung",
  "isPrimary": true,
  "mimeType": "image/jpeg",
  "createdAt": "2025-10-17T..."
}
```

### 2. Alle Bilder eines Produkts abrufen

**Endpoint:** `GET /api/admin/products/:id/images`

```bash
curl -X GET http://localhost:3000/api/admin/products/{PRODUCT_ID}/images \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response:**
```json
[
  {
    "id": "image-uuid-1",
    "url": "/api/images/image-uuid-1",
    "alt": "Hauptbild",
    "isPrimary": true,
    "mimeType": "image/jpeg",
    "createdAt": "2025-10-17T..."
  },
  {
    "id": "image-uuid-2",
    "url": "/api/images/image-uuid-2",
    "alt": "Detailansicht",
    "isPrimary": false,
    "mimeType": "image/png",
    "createdAt": "2025-10-17T..."
  }
]
```

### 3. Bild löschen

**Endpoint:** `DELETE /api/admin/products/:productId/images/:imageId`

```bash
curl -X DELETE http://localhost:3000/api/admin/products/{PRODUCT_ID}/images/{IMAGE_ID} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Integration mit Frontend (Shop-Verwaltung)

### Beispiel: Bild-Upload-Formular

Das Frontend kann ein Formular mit File-Input erstellen:

```html
<form id="uploadForm">
  <input type="file" name="file" accept="image/*" required>
  <input type="text" name="alt" placeholder="Bildbeschreibung">
  <input type="checkbox" name="isPrimary"> Hauptbild
  <button type="submit">Hochladen</button>
</form>
```

```javascript
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const productId = 'YOUR_PRODUCT_ID';

  const response = await fetch(`/api/admin/products/${productId}/images/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });

  const result = await response.json();
  console.log('Bild hochgeladen:', result);
});
```

## Bild-Limitierungen

- **Maximale Dateigröße:** 5 MB
- **Erlaubte Formate:** JPEG, JPG, PNG, GIF, WebP
- **Speicherort:** MariaDB als LONGBLOB

## Swagger API Dokumentation

Die vollständige API-Dokumentation mit Test-Interface finden Sie unter:

```
http://localhost:3000/api
```

Dort können Sie:
1. Sich authentifizieren (Authorize-Button)
2. Die neuen Upload-Endpoints testen
3. Bilder direkt hochladen

## Workflow für die Shop-Verwaltung

1. **Login** im Admin-Panel
2. **Produkt auswählen** in der Produktverwaltung
3. **"Bild hochladen"** Button klicken
4. **Datei auswählen** von Ihrem Computer
5. **Optional:** Alt-Text und Hauptbild-Flag setzen
6. **Hochladen** - Das Bild wird in der Datenbank gespeichert
7. **Anzeige:** Das Bild wird sofort im Frontend angezeigt

## Vorteile dieser Lösung

✅ **Keine externe Abhängigkeit** (kein Imgur, etc. nötig)
✅ **Alles in einer Datenbank** (einfaches Backup)
✅ **Schneller Zugriff** (direkt aus DB)
✅ **Sichere Verwaltung** (nur Admins können hochladen)
✅ **Automatische URLs** (`/api/images/{id}`)

## API Endpoints Übersicht

| Method | Endpoint | Beschreibung |
|--------|----------|--------------|
| POST | `/api/admin/products/:id/images/upload` | Bild hochladen |
| GET | `/api/admin/products/:id/images` | Alle Bilder abrufen |
| DELETE | `/api/admin/products/:productId/images/:imageId` | Bild löschen |
| GET | `/api/images/:imageId` | Bild anzeigen (öffentlich) |

## Nächste Schritte

Das Backend ist fertig! Jetzt muss das Frontend (Shop-Verwaltung) angepasst werden:

1. Upload-Button zur Produktverwaltung hinzufügen
2. File-Input-Formular erstellen
3. Bild-Vorschau anzeigen
4. Upload-Fortschritt anzeigen (optional)

Benötigen Sie Hilfe beim Frontend? Ich kann ein Beispiel-Formular erstellen!
