# Produktbilder aus der MariaDB Datenbank

## Übersicht

Das System speichert jetzt Produktbilder direkt als BLOB in der MariaDB-Datenbank. Dies bedeutet:

1. **Keine externen URLs mehr nötig** - Bilder werden direkt in der Datenbank gespeichert
2. **Automatische Bild-URLs** - Das API generiert automatisch URLs im Format `/api/images/{imageId}`
3. **Effizientes Caching** - Bilder werden mit 1-Jahr-Cache-Header ausgeliefert

## API Endpoints

### 1. Bild zu Produkt hochladen

```bash
POST /api/images/product/{productId}
```

**Beispiel mit cURL:**

```bash
curl -X POST http://localhost:3000/api/images/product/11074c34-936c-4ace-82b0-df2c509c4482 \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/pfad/zu/ihrem/bild.jpg" \
  -F "alt=Drahtarmband Kupfer Hauptansicht" \
  -F "isPrimary=true"
```

**Parameter:**
- `file` (required): Die Bilddatei (max 5MB, nur jpg/jpeg/png/gif/webp)
- `alt` (optional): Alternativer Text für das Bild
- `isPrimary` (optional): true/false - Ist dies das Hauptbild?

**Response:**
```json
{
  "id": "abc123...",
  "url": "/api/images/abc123...",
  "alt": "Drahtarmband Kupfer Hauptansicht",
  "isPrimary": true,
  "mimeType": "image/jpeg",
  "createdAt": "2025-10-17T15:30:00.000Z"
}
```

### 2. Bild abrufen

```bash
GET /api/images/{imageId}
```

**Beispiel:**
```bash
curl http://localhost:3000/api/images/abc123...
```

Das Bild wird direkt als Binärdaten zurückgegeben.

### 3. Alle Bilder eines Produkts anzeigen

```bash
GET /api/images/product/{productId}
```

**Beispiel:**
```bash
curl http://localhost:3000/api/images/product/11074c34-936c-4ace-82b0-df2c509c4482
```

**Response:**
```json
[
  {
    "id": "abc123...",
    "url": "/api/images/abc123...",
    "alt": "Hauptansicht",
    "isPrimary": true,
    "mimeType": "image/jpeg",
    "createdAt": "2025-10-17T15:30:00.000Z"
  }
]
```

### 4. Bild löschen

```bash
DELETE /api/images/{imageId}
```

**Beispiel:**
```bash
curl -X DELETE http://localhost:3000/api/images/abc123...
```

## Frontend Integration

Im Frontend können Sie die Bilder direkt über die URL verwenden:

```html
<img src="http://localhost:3000/api/images/abc123..." alt="Produktbild">
```

Oder in React:

```jsx
<img
  src={`${API_BASE_URL}/api/images/${image.id}`}
  alt={image.alt}
/>
```

## Produktliste mit Bildern

Wenn Sie Produkte abrufen, enthalten diese automatisch die Bild-URLs:

```bash
GET /api/products
```

**Response:**
```json
{
  "data": [
    {
      "id": "11074c34-936c-4ace-82b0-df2c509c4482",
      "name": "Drahtarmband Kupfer",
      "price": 29.99,
      "images": [
        {
          "id": "abc123...",
          "url": "/api/images/abc123...",
          "alt": "Hauptansicht",
          "isPrimary": true
        }
      ]
    }
  ]
}
```

## Bilder zu bestehenden Produkten hinzufügen

Um Bilder zu Ihren bestehenden Produkten hinzuzufügen:

1. **Finden Sie die Produkt-IDs:**
```bash
curl http://localhost:3000/api/products
```

2. **Laden Sie für jedes Produkt ein Bild hoch:**
```bash
# Beispiel für Drahtarmband Kupfer
curl -X POST http://localhost:3000/api/images/product/11074c34-936c-4ace-82b0-df2c509c4482 \
  -F "file=@armband-kupfer.jpg" \
  -F "alt=Drahtarmband Kupfer" \
  -F "isPrimary=true"
```

## Swagger API Dokumentation

Die vollständige API-Dokumentation finden Sie unter:
```
http://localhost:3000/api
```

Dort können Sie auch direkt Bilder hochladen und testen!

## Technische Details

- **Maximale Dateigröße:** 5 MB
- **Erlaubte Formate:** JPEG, JPG, PNG, GIF, WebP
- **Speicherung:** Als LONGBLOB in der `product_images` Tabelle
- **Caching:** Bilder werden mit `max-age=31536000` (1 Jahr) gecacht

## Datenbank-Schema

Die `product_images` Tabelle hat jetzt folgende Felder:

- `id` - UUID des Bildes
- `productId` - Referenz zum Produkt
- `data` - LONGBLOB mit den Bilddaten
- `mimeType` - MIME-Type (z.B. "image/jpeg")
- `url` - Optional: Externe URL (falls gewünscht)
- `alt` - Alternativer Text
- `isPrimary` - Boolean: Hauptbild ja/nein
- `createdAt` - Erstellungsdatum
