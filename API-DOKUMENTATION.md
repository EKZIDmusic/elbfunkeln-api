# Elbfunkeln API Dokumentation

**Version:** 1.0.0
**Base URL:** `http://localhost:3000/api`
**Swagger Dokumentation:** `http://localhost:3000/api/docs`

## Übersicht

Diese API bietet alle Funktionalitäten für den Elbfunkeln E-Commerce Shop inklusive:
- Benutzer-Authentifizierung & Profilverwaltung
- Produktkatalog & Kategorien
- Warenkorb & Bestellverwaltung
- Payment Integration (Stripe)
- Admin-Panel & Analytics
- Support-Tickets & Kontaktanfragen
- Newsletter & E-Mail-Service

**Technologie-Stack:**
- NestJS Framework
- MySQL Datenbank (via Prisma ORM)
- JWT Authentication
- Stripe Payment Gateway
- Redis für Caching & Background Jobs

---

## 🔐 Authentication

### Register (Registrierung)
**POST** `/auth/register`

**Body:**
```json
{
  "email": "string (E-Mail-Format)",
  "password": "string (min. 6 Zeichen)",
  "firstName": "string",
  "lastName": "string"
}
```

**Response:**
```json
{
  "access_token": "string (JWT)",
  "user": {
    "id": "uuid",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "CUSTOMER"
  }
}
```

---

### Login (Anmeldung)
**POST** `/auth/login`

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "access_token": "string (JWT)",
  "user": {
    "id": "uuid",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "role": "CUSTOMER"
  }
}
```

---

### Get Profile (Profil abrufen)
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "userId": "uuid",
  "email": "string",
  "role": "CUSTOMER"
}
```

---

## 🛍️ Products (Produkte)

### Get All Products (Alle Produkte abrufen)
**GET** `/products`

**Query Parameters (optional):**
- `page`: number (Default: 1)
- `limit`: number (Default: 20)
- `categoryId`: uuid
- `search`: string

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "price": "decimal (10,2)",
      "discountPrice": "decimal (10,2) | null",
      "sku": "string",
      "stock": "number",
      "isActive": "boolean",
      "isFeatured": "boolean",
      "giftboxavailable": "boolean",
      "categoryId": "uuid",
      "category": {
        "id": "uuid",
        "name": "string",
        "slug": "string"
      },
      "images": [
        {
          "id": "uuid",
          "url": "string",
          "alt": "string",
          "isPrimary": "boolean"
        }
      ],
      "reviews": [],
      "createdAt": "ISO 8601",
      "updatedAt": "ISO 8601"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

---

### Get Featured Products (Empfohlene Produkte)
**GET** `/products/featured`

**Response:** Wie "Get All Products" (nur gefiltert nach `isFeatured: true`)

---

### Search Products (Produkte suchen)
**GET** `/products/search?q={Suchbegriff}`

**Query Parameters:**
- `q`: string (required)

**Response:** Wie "Get All Products"

---

### Get Product by ID (Einzelnes Produkt)
**GET** `/products/{id}`

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price": "decimal (10,2)",
  "discountPrice": "decimal (10,2) | null",
  "sku": "string",
  "stock": "number",
  "isActive": "boolean",
  "isFeatured": "boolean",
  "giftboxavailable": "boolean",
  "categoryId": "uuid",
  "category": {
    "id": "uuid",
    "name": "string",
    "slug": "string",
    "description": "string | null"
  },
  "images": [
    {
      "id": "uuid",
      "url": "string",
      "alt": "string",
      "isPrimary": "boolean"
    }
  ],
  "reviews": [
    {
      "id": "uuid",
      "rating": "number (1-5)",
      "comment": "string",
      "userId": "uuid",
      "createdAt": "ISO 8601"
    }
  ],
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

---

## 📂 Categories (Kategorien)

### Get All Categories (Alle Kategorien)
**GET** `/categories`

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "slug": "string",
    "description": "string | null",
    "parentId": "uuid | null",
    "children": [],
    "createdAt": "ISO 8601"
  }
]
```

---

### Get Category by ID (Einzelne Kategorie)
**GET** `/categories/{id}`

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "slug": "string",
  "description": "string | null",
  "parentId": "uuid | null",
  "products": [],
  "children": [],
  "createdAt": "ISO 8601"
}
```

---

## 🛒 Cart (Warenkorb)

**Authentifizierung erforderlich** (alle Endpoints)

### Get Cart (Warenkorb abrufen)
**GET** `/cart`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "quantity": "number",
      "product": {
        "id": "uuid",
        "name": "string",
        "price": "decimal (10,2)",
        "discountPrice": "decimal (10,2) | null",
        "images": [],
        "stock": "number"
      },
      "createdAt": "ISO 8601"
    }
  ],
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

---

### Add Item to Cart (Artikel hinzufügen)
**POST** `/cart/items`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "productId": "uuid",
  "quantity": "number (min: 1)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "cartId": "uuid",
  "productId": "uuid",
  "quantity": "number",
  "product": {},
  "createdAt": "ISO 8601"
}
```

---

### Update Cart Item (Menge ändern)
**PUT** `/cart/items/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "quantity": "number (min: 1)"
}
```

**Response:** Aktualisiertes CartItem

---

### Remove Cart Item (Artikel entfernen)
**DELETE** `/cart/items/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Item removed from cart"
}
```

---

### Clear Cart (Warenkorb leeren)
**DELETE** `/cart`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Cart cleared"
}
```

---

## 📦 Orders (Bestellungen)

**Authentifizierung erforderlich** (alle Endpoints)

### Create Order (Bestellung erstellen)
**POST** `/orders`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "addressId": "uuid",
  "items": [
    {
      "productId": "uuid",
      "quantity": "number"
    }
  ],
  "notes": "string (optional)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "orderNumber": "string (z.B. ORD-20250104-001)",
  "userId": "uuid",
  "addressId": "uuid",
  "status": "PENDING",
  "paymentStatus": "PENDING",
  "shippingStatus": "PENDING",
  "subtotal": "decimal (10,2)",
  "tax": "decimal (10,2)",
  "shipping": "decimal (10,2)",
  "discount": "decimal (10,2)",
  "total": "decimal (10,2)",
  "notes": "string | null",
  "trackingNumber": "string | null",
  "stripePaymentId": "string | null",
  "discountCode": "string | null",
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "quantity": "number",
      "price": "decimal (10,2)",
      "product": {}
    }
  ],
  "address": {},
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}
```

---

### Get User Orders (Meine Bestellungen)
**GET** `/orders`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
[
  {
    "id": "uuid",
    "orderNumber": "string",
    "status": "PENDING | PAID | PROCESSING | SHIPPED | DELIVERED | CANCELLED | REFUNDED",
    "paymentStatus": "PENDING | COMPLETED | FAILED | REFUNDED",
    "shippingStatus": "PENDING | LABEL_CREATED | PICKED_UP | IN_TRANSIT | OUT_FOR_DELIVERY | DELIVERED | FAILED",
    "total": "decimal (10,2)",
    "items": [],
    "createdAt": "ISO 8601"
  }
]
```

---

### Get Order Details (Bestelldetails)
**GET** `/orders/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Vollständige Bestelldetails (wie "Create Order")

---

### Cancel Order (Bestellung stornieren)
**PUT** `/orders/{id}/cancel`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "CANCELLED",
  "...": "..."
}
```

---

## 🎁 Gift Cards (Geschenkkarten)

### Get Gift Card by Code (Geschenkkarte prüfen)
**GET** `/gift-cards/{code}`

**Response:**
```json
{
  "id": "uuid",
  "code": "string",
  "amount": "decimal (10,2)",
  "balance": "decimal (10,2)",
  "isActive": "boolean",
  "expiresAt": "ISO 8601 | null",
  "createdAt": "ISO 8601"
}
```

---

## 📧 Newsletter

### Subscribe (Newsletter abonnieren)
**POST** `/newsletter/subscribe`

**Body:**
```json
{
  "email": "string (E-Mail-Format)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "string",
  "isActive": "boolean",
  "createdAt": "ISO 8601"
}
```

---

### Unsubscribe (Newsletter abbestellen)
**DELETE** `/newsletter/{email}`

**Response:**
```json
{
  "message": "Unsubscribed successfully"
}
```

---

---

## 👤 Users (Benutzerverwaltung)

**Authentifizierung erforderlich** (alle Endpoints)

### Get Current User Profile (Eigenes Profil)
**GET** `/users/me`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "id": "uuid",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "displayName": "string | null",
  "phone": "string | null",
  "role": "CUSTOMER",
  "status": "active",
  "isVerified": "boolean",
  "createdAt": "ISO 8601"
}
```

---

### Update Current User (Profil aktualisieren)
**PATCH** `/users/me`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "firstName": "string (optional)",
  "lastName": "string (optional)",
  "displayName": "string (optional)",
  "phone": "string (optional)"
}
```

**Response:** Aktualisiertes User-Objekt

---

### Get User by ID
**GET** `/users/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** User-Objekt

---

## 📍 Addresses (Adressen)

**Authentifizierung erforderlich** (alle Endpoints)

### Create Address (Adresse erstellen)
**POST** `/addresses`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "street": "string",
  "city": "string",
  "state": "string (optional)",
  "zip": "string",
  "country": "string (default: DE)",
  "isDefault": "boolean (optional)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "firstName": "string",
  "lastName": "string",
  "street": "string",
  "city": "string",
  "state": "string | null",
  "zip": "string",
  "country": "string",
  "isDefault": "boolean",
  "createdAt": "ISO 8601"
}
```

---

### Get All Addresses (Alle Adressen)
**GET** `/addresses`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Array von Address-Objekten

---

### Get Address by ID (Einzelne Adresse)
**GET** `/addresses/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Address-Objekt

---

### Update Address (Adresse aktualisieren)
**PATCH** `/addresses/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:** Wie "Create Address" (alle Felder optional)

**Response:** Aktualisiertes Address-Objekt

---

### Delete Address (Adresse löschen)
**DELETE** `/addresses/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Address deleted successfully"
}
```

---

## ⭐ Favorites (Favoriten)

**Authentifizierung erforderlich** (alle Endpoints)

### Add to Favorites (Zu Favoriten hinzufügen)
**POST** `/favorites`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "productId": "uuid"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "productId": "uuid",
  "createdAt": "ISO 8601",
  "product": {}
}
```

---

### Get All Favorites (Alle Favoriten)
**GET** `/favorites`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
[
  {
    "id": "uuid",
    "productId": "uuid",
    "product": {
      "id": "uuid",
      "name": "string",
      "price": "decimal",
      "images": []
    },
    "createdAt": "ISO 8601"
  }
]
```

---

### Check if Product is Favorited (Prüfen ob favorisiert)
**GET** `/favorites/{productId}/check`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "isFavorite": "boolean"
}
```

---

### Remove from Favorites (Von Favoriten entfernen)
**DELETE** `/favorites/{productId}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Removed from favorites"
}
```

---

## ⭐ Reviews (Bewertungen)

### Create Review (Bewertung erstellen)
**POST** `/reviews`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "productId": "uuid",
  "rating": "number (1-5)",
  "comment": "string (optional)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "productId": "uuid",
  "rating": "number",
  "comment": "string | null",
  "isVerified": "boolean",
  "createdAt": "ISO 8601"
}
```

---

### Get All Reviews (Alle Bewertungen)
**GET** `/reviews`

**Query Parameters (optional):**
- `productId`: uuid (Filter nach Produkt)
- `userId`: uuid (Filter nach Benutzer)

**Response:** Array von Review-Objekten

---

### Get Product Rating Stats (Produkt-Bewertungsstatistik)
**GET** `/reviews/product/{productId}/stats`

**Response:**
```json
{
  "productId": "uuid",
  "totalReviews": "number",
  "averageRating": "number",
  "ratingDistribution": {
    "1": "number",
    "2": "number",
    "3": "number",
    "4": "number",
    "5": "number"
  }
}
```

---

### Get Review by ID (Einzelne Bewertung)
**GET** `/reviews/{id}`

**Response:** Review-Objekt

---

### Update Review (Bewertung aktualisieren)
**PATCH** `/reviews/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "rating": "number (1-5, optional)",
  "comment": "string (optional)"
}
```

**Response:** Aktualisiertes Review-Objekt

---

### Delete Review (Bewertung löschen)
**DELETE** `/reviews/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Review deleted"
}
```

---

## 💳 Discounts (Rabattcodes)

### Validate Discount Code (Code validieren)
**POST** `/discounts/validate`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "code": "string",
  "orderAmount": "number"
}
```

**Response:**
```json
{
  "isValid": "boolean",
  "discount": {
    "id": "uuid",
    "code": "string",
    "type": "PERCENTAGE | FIXED",
    "value": "decimal",
    "description": "string"
  }
}
```

---

### Apply Discount (Rabatt anwenden)
**POST** `/discounts/apply`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "code": "string",
  "orderId": "uuid"
}
```

**Response:**
```json
{
  "orderId": "uuid",
  "discountApplied": "decimal",
  "newTotal": "decimal"
}
```

---

### Get Discount by Code (Code abrufen)
**GET** `/discounts/{code}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Discount-Objekt

---

## 🎫 Tickets (Support-Tickets)

**Authentifizierung erforderlich** (alle Endpoints)

### Create Ticket (Ticket erstellen)
**POST** `/tickets`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "subject": "string",
  "priority": "LOW | MEDIUM | HIGH | URGENT (optional, default: MEDIUM)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "subject": "string",
  "status": "OPEN",
  "priority": "MEDIUM",
  "createdAt": "ISO 8601"
}
```

---

### Get Ticket by ID (Ticket abrufen)
**GET** `/tickets/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Ticket-Objekt mit Messages

---

### Update Ticket (Ticket aktualisieren)
**PATCH** `/tickets/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "status": "OPEN | IN_PROGRESS | CLOSED (optional)",
  "priority": "LOW | MEDIUM | HIGH | URGENT (optional)"
}
```

**Response:** Aktualisiertes Ticket-Objekt

---

### Add Message to Ticket (Nachricht hinzufügen)
**POST** `/tickets/{id}/messages`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "content": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "ticketId": "uuid",
  "content": "string",
  "isStaff": "boolean",
  "createdAt": "ISO 8601"
}
```

---

### Get Ticket Messages (Nachrichten abrufen)
**GET** `/tickets/{id}/messages`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Array von TicketMessage-Objekten

---

## 💰 Payments (Zahlungen)

### Create Payment (Zahlung erstellen)
**POST** `/payments`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "orderId": "uuid",
  "paymentMethodId": "string (Stripe Payment Method ID)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "orderId": "uuid",
  "stripePaymentIntentId": "string",
  "status": "PENDING | COMPLETED | FAILED",
  "amount": "decimal",
  "createdAt": "ISO 8601"
}
```

---

### Get All Payments (Alle Zahlungen)
**GET** `/payments`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Array von Payment-Objekten

---

### Get Payment by ID (Zahlung abrufen)
**GET** `/payments/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Payment-Objekt

---

### Stripe Webhook (Stripe Webhook Handler)
**POST** `/payments/webhook`

**Headers:**
```
stripe-signature: {Stripe Signature}
```

**Body:** Stripe Event Payload

**Response:**
```json
{
  "received": true
}
```

---

## 📨 Contact (Kontaktanfragen)

### Create Contact Inquiry (Kontaktanfrage erstellen)
**POST** `/contact`

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "status": "NEW",
  "createdAt": "ISO 8601"
}
```

---

## 🚚 Shipping (Versandmethoden)

**Authentifizierung erforderlich** (alle Endpoints)

### Get All Shipping Methods (Alle Versandmethoden)
**GET** `/shipping`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "price": "decimal",
    "estimatedDays": "number",
    "isActive": "boolean"
  }
]
```

---

### Get Shipping Method by ID (Versandmethode abrufen)
**GET** `/shipping/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Shipping-Objekt

---

## 👨‍💼 Admin Endpoints

### Admin - Contact Inquiries

**Rolle erforderlich:** ADMIN oder SHOP_OWNER

#### Get All Contact Inquiries
**GET** `/admin/contact`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `status`: NEW | IN_PROGRESS | RESOLVED | CLOSED
- `page`: number
- `limit`: number

**Response:** Array von ContactInquiry-Objekten mit Pagination

---

#### Get Contact Inquiry by ID
**GET** `/admin/contact/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** ContactInquiry-Objekt

---

#### Update Contact Inquiry
**PUT** `/admin/contact/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "status": "NEW | IN_PROGRESS | RESOLVED | CLOSED"
}
```

**Response:** Aktualisiertes ContactInquiry-Objekt

---

#### Delete Contact Inquiry (nur ADMIN)
**DELETE** `/admin/contact/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Contact inquiry deleted"
}
```

---

### Admin - Analytics

**Rolle erforderlich:** ADMIN oder SHOP_OWNER

#### Get Dashboard Statistics
**GET** `/admin/analytics/dashboard`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "totalRevenue": "decimal",
  "totalOrders": "number",
  "totalCustomers": "number",
  "totalProducts": "number",
  "revenueGrowth": "number (%)",
  "ordersGrowth": "number (%)",
  "customersGrowth": "number (%)"
}
```

---

#### Get Sales Data
**GET** `/admin/analytics/sales`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `startDate`: ISO 8601 (optional)
- `endDate`: ISO 8601 (optional)

**Response:**
```json
{
  "totalRevenue": "decimal",
  "totalOrders": "number",
  "averageOrderValue": "decimal",
  "salesByDay": [
    {
      "date": "ISO 8601",
      "revenue": "decimal",
      "orders": "number"
    }
  ]
}
```

---

#### Get Customer Insights
**GET** `/admin/analytics/customers`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `startDate`: ISO 8601 (optional)
- `endDate`: ISO 8601 (optional)

**Response:**
```json
{
  "totalCustomers": "number",
  "newCustomers": "number",
  "returningCustomers": "number",
  "customersByMonth": []
}
```

---

#### Get Product Performance
**GET** `/admin/analytics/products`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `startDate`: ISO 8601 (optional)
- `endDate`: ISO 8601 (optional)

**Response:**
```json
{
  "topProducts": [
    {
      "productId": "uuid",
      "name": "string",
      "totalSold": "number",
      "revenue": "decimal"
    }
  ],
  "lowStockProducts": []
}
```

---

#### Get Order Statistics
**GET** `/admin/analytics/orders`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `startDate`: ISO 8601 (optional)
- `endDate`: ISO 8601 (optional)

**Response:**
```json
{
  "totalOrders": "number",
  "ordersByStatus": {
    "PENDING": "number",
    "PAID": "number",
    "PROCESSING": "number",
    "SHIPPED": "number",
    "DELIVERED": "number"
  }
}
```

---

### Admin - Users

**Rolle erforderlich:** ADMIN

#### Get All Users
**GET** `/admin/users`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `page`: number
- `limit`: number
- `role`: CUSTOMER | SHOP_OWNER | ADMIN
- `status`: active | inactive | banned
- `search`: string

**Response:**
```json
{
  "data": [],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

---

#### Get User by ID
**GET** `/admin/users/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** User-Objekt mit detaillierten Informationen

---

#### Update User
**PUT** `/admin/users/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "role": "CUSTOMER | SHOP_OWNER | ADMIN (optional)",
  "status": "active | inactive | banned (optional)",
  "isVerified": "boolean (optional)"
}
```

**Response:** Aktualisiertes User-Objekt

---

#### Delete User
**DELETE** `/admin/users/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "User deleted"
}
```

---

#### Get User Sessions
**GET** `/admin/users/{id}/sessions`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `activeOnly`: boolean

**Response:** Array von UserSession-Objekten

---

#### Revoke User Session
**DELETE** `/admin/users/{id}/sessions/{sessionId}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Session revoked"
}
```

---

#### Revoke All User Sessions
**DELETE** `/admin/users/{id}/sessions`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "All sessions revoked"
}
```

---

#### Get User Activities
**GET** `/admin/users/{id}/activities`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `limit`: number

**Response:** Array von UserActivity-Objekten

---

### Admin - Tickets

**Rolle erforderlich:** ADMIN

#### Get All Tickets
**GET** `/tickets`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `status`: OPEN | IN_PROGRESS | CLOSED

**Response:** Array von Ticket-Objekten

---

#### Delete Ticket
**DELETE** `/tickets/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Ticket deleted"
}
```

---

### Admin - Discounts

**Rolle erforderlich:** ADMIN

#### Create Discount
**POST** `/discounts`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "code": "string",
  "description": "string (optional)",
  "type": "PERCENTAGE | FIXED",
  "value": "decimal",
  "minAmount": "decimal (optional)",
  "maxUses": "number (optional)",
  "startsAt": "ISO 8601 (optional)",
  "expiresAt": "ISO 8601 (optional)"
}
```

**Response:** Discount-Objekt

---

#### Get All Discounts
**GET** `/discounts`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Array von Discount-Objekten

---

#### Update Discount
**PATCH** `/discounts/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:** Wie "Create Discount" (alle Felder optional)

**Response:** Aktualisiertes Discount-Objekt

---

#### Delete Discount
**DELETE** `/discounts/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:**
```json
{
  "message": "Discount deleted"
}
```

---

### Admin - Shipping

**Rolle erforderlich:** ADMIN

#### Create Shipping Method
**POST** `/shipping`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": "decimal",
  "estimatedDays": "number",
  "isActive": "boolean"
}
```

**Response:** Shipping-Objekt

---

#### Update Shipping Method
**PATCH** `/shipping/{id}`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:** Wie "Create Shipping Method" (alle Felder optional)

**Response:** Aktualisiertes Shipping-Objekt

---

### Admin - Newsletter

**Rolle erforderlich:** ADMIN

#### Get All Newsletter Subscribers
**GET** `/newsletter`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Response:** Array von Newsletter-Objekten

---

### Admin - Orders

**Rolle erforderlich:** ADMIN oder SHOP_OWNER

#### Get All Orders (Admin)
**GET** `/orders/admin/all`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Query Parameters:**
- `page`: number
- `limit`: number
- `status`: OrderStatus

**Response:** Paginierte Liste aller Bestellungen

---

#### Update Order Status
**PUT** `/orders/admin/{id}/status`

**Headers:**
```
Authorization: Bearer {JWT-Token}
```

**Body:**
```json
{
  "status": "PENDING | PAID | PROCESSING | SHIPPED | DELIVERED | CANCELLED | REFUNDED",
  "paymentStatus": "PENDING | COMPLETED | FAILED | REFUNDED (optional)",
  "shippingStatus": "PENDING | LABEL_CREATED | PICKED_UP | IN_TRANSIT | OUT_FOR_DELIVERY | DELIVERED | FAILED (optional)",
  "trackingNumber": "string (optional)"
}
```

**Response:** Aktualisiertes Order-Objekt

---

## 📊 Enums (Status-Werte)

### UserRole
- `CUSTOMER` (Standard Kunde)
- `SHOP_OWNER` (Shop-Besitzer)
- `ADMIN` (Administrator)

### UserStatus
- `active` (Aktiv)
- `inactive` (Inaktiv)
- `banned` (Gesperrt)

### OrderStatus
- `PENDING` (Ausstehend)
- `PAID` (Bezahlt)
- `PROCESSING` (In Bearbeitung)
- `SHIPPED` (Versendet)
- `DELIVERED` (Zugestellt)
- `CANCELLED` (Storniert)
- `REFUNDED` (Erstattet)

### PaymentStatus
- `PENDING` (Ausstehend)
- `COMPLETED` (Abgeschlossen)
- `FAILED` (Fehlgeschlagen)
- `REFUNDED` (Erstattet)

### ShippingStatus
- `PENDING` (Ausstehend)
- `LABEL_CREATED` (Label erstellt)
- `PICKED_UP` (Abgeholt)
- `IN_TRANSIT` (Unterwegs)
- `OUT_FOR_DELIVERY` (Wird zugestellt)
- `DELIVERED` (Zugestellt)
- `FAILED` (Fehlgeschlagen)

### TicketStatus
- `OPEN` (Offen)
- `IN_PROGRESS` (In Bearbeitung)
- `CLOSED` (Geschlossen)

### TicketPriority
- `LOW` (Niedrig)
- `MEDIUM` (Mittel)
- `HIGH` (Hoch)
- `URGENT` (Dringend)

### ContactStatus
- `NEW` (Neu)
- `IN_PROGRESS` (In Bearbeitung)
- `RESOLVED` (Gelöst)
- `CLOSED` (Geschlossen)

---

## 🔑 Authentifizierung

Für geschützte Endpoints muss im Header das JWT-Token mitgesendet werden:

```
Authorization: Bearer {JWT-Token}
```

Das Token erhält man nach erfolgreicher Registration oder Login.

---

## 🎨 Wichtige Hinweise für die Webseite

### Produktdarstellung
- **giftboxavailable**: Boolean - zeigt an, ob das Produkt mit Geschenkbox erhältlich ist
- **discountPrice**: Falls vorhanden, sollte der reduzierte Preis angezeigt werden
- **isFeatured**: Featured Produkte können prominent angezeigt werden
- **stock**: Lagerbestand prüfen vor "In den Warenkorb"-Button

### Warenkorb-Flow
1. Produkt in Warenkorb legen: POST `/cart/items`
2. Warenkorb anzeigen: GET `/cart`
3. Menge ändern: PUT `/cart/items/{id}`
4. Artikel entfernen: DELETE `/cart/items/{id}`
5. Bestellung erstellen: POST `/orders`

### Bilder
- Jedes Produkt kann mehrere Bilder haben
- `isPrimary: true` markiert das Hauptbild
- Alle Bilder haben eine `url` und optional `alt`-Text

### Preisberechnung
Bei Bestellungen werden folgende Werte berechnet:
- **subtotal**: Summe aller Artikel
- **tax**: Steuer (MwSt.)
- **shipping**: Versandkosten
- **discount**: Rabatt (falls Code verwendet)
- **total**: Endsumme

---

## 📋 API-Übersicht nach Modulen

### Öffentliche Endpoints (ohne Authentifizierung)
- `POST /auth/register` - Registrierung
- `POST /auth/login` - Login
- `GET /products` - Produktliste
- `GET /products/featured` - Featured Produkte
- `GET /products/search` - Produktsuche
- `GET /products/{id}` - Produktdetails
- `GET /categories` - Kategorien
- `GET /categories/{id}` - Kategorie-Details
- `GET /gift-cards/{code}` - Geschenkkarte prüfen
- `POST /newsletter/subscribe` - Newsletter abonnieren
- `DELETE /newsletter/{email}` - Newsletter abbestellen
- `POST /contact` - Kontaktanfrage
- `GET /reviews` - Bewertungen lesen
- `GET /reviews/product/{id}/stats` - Bewertungsstatistik
- `POST /payments/webhook` - Stripe Webhook

### Kunden-Endpoints (Authentifizierung erforderlich)
- `GET /auth/profile` - Eigenes Profil
- `GET /users/me` - Benutzerprofil
- `PATCH /users/me` - Profil aktualisieren
- `POST /addresses` - Adresse erstellen
- `GET /addresses` - Adressen abrufen
- `PATCH /addresses/{id}` - Adresse bearbeiten
- `DELETE /addresses/{id}` - Adresse löschen
- `GET /cart` - Warenkorb
- `POST /cart/items` - Artikel hinzufügen
- `PUT /cart/items/{id}` - Menge ändern
- `DELETE /cart/items/{id}` - Artikel entfernen
- `POST /orders` - Bestellung erstellen
- `GET /orders` - Bestellungen
- `GET /orders/{id}` - Bestelldetails
- `PUT /orders/{id}/cancel` - Bestellung stornieren
- `POST /favorites` - Favorit hinzufügen
- `GET /favorites` - Favoriten
- `DELETE /favorites/{id}` - Favorit entfernen
- `POST /reviews` - Bewertung schreiben
- `PATCH /reviews/{id}` - Bewertung bearbeiten
- `DELETE /reviews/{id}` - Bewertung löschen
- `POST /discounts/validate` - Rabattcode prüfen
- `POST /payments` - Zahlung erstellen
- `GET /payments` - Zahlungen
- `POST /tickets` - Support-Ticket erstellen
- `GET /tickets/{id}` - Ticket abrufen
- `POST /tickets/{id}/messages` - Nachricht senden

### Admin-Endpoints (ADMIN oder SHOP_OWNER Rolle)
- `POST /products` - Produkt erstellen
- `PUT /products/{id}` - Produkt bearbeiten
- `DELETE /products/{id}` - Produkt löschen
- `POST /categories` - Kategorie erstellen
- `PUT /categories/{id}` - Kategorie bearbeiten
- `DELETE /categories/{id}` - Kategorie löschen
- `GET /orders/admin/all` - Alle Bestellungen
- `PUT /orders/admin/{id}/status` - Bestellstatus ändern
- `GET /admin/contact` - Kontaktanfragen
- `PUT /admin/contact/{id}` - Kontaktanfrage bearbeiten
- `GET /admin/analytics/dashboard` - Dashboard-Statistiken
- `GET /admin/analytics/sales` - Verkaufsdaten
- `GET /admin/analytics/customers` - Kundenanalyse
- `GET /admin/analytics/products` - Produktperformance
- `GET /admin/users` - Benutzerverwaltung
- `PUT /admin/users/{id}` - Benutzer bearbeiten
- `DELETE /admin/users/{id}` - Benutzer löschen
- `GET /admin/users/{id}/sessions` - User Sessions
- `GET /admin/users/{id}/activities` - User Aktivitäten
- `POST /discounts` - Rabattcode erstellen
- `PATCH /discounts/{id}` - Rabattcode bearbeiten
- `DELETE /discounts/{id}` - Rabattcode löschen
- `POST /shipping` - Versandmethode erstellen
- `PATCH /shipping/{id}` - Versandmethode bearbeiten
- `GET /newsletter` - Newsletter-Abonnenten
- `GET /tickets` - Alle Tickets
- `DELETE /tickets/{id}` - Ticket löschen

---

## 🔧 Entwicklungshinweise

### Umgebungsvariablen
Die folgenden Umgebungsvariablen müssen in `.env` konfiguriert sein:
```
DATABASE_URL=mysql://user:password@localhost:3306/elbfunkeln
SHADOW_DATABASE_URL=mysql://user:password@localhost:3306/elbfunkeln_shadow
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
REDIS_HOST=localhost
REDIS_PORT=6379
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

### Rate Limiting
Die API implementiert Rate Limiting:
- **Standard**: 100 Anfragen pro 15 Minuten
- **Auth-Endpoints**: 5 Anfragen pro 15 Minuten

### CORS
CORS ist konfiguriert für:
- Development: `http://localhost:5173`
- Production: Konfigurierbar über Umgebungsvariablen

### Pagination
Standard-Pagination-Parameter:
- `page`: Seitennummer (default: 1)
- `limit`: Einträge pro Seite (default: 20, max: 100)

### Fehlerbehandlung
Alle Endpoints geben strukturierte Fehler zurück:
```json
{
  "statusCode": 400,
  "message": "Fehlerbeschreibung",
  "error": "Bad Request"
}
```

### Session Management
- JWT Tokens sind 7 Tage gültig
- User Sessions werden getrackt für Admin-Übersicht
- Admins können Sessions widerrufen

### Security Features
- Helmet.js für HTTP-Header-Sicherheit
- CORS-Schutz
- Rate Limiting (Throttling)
- JWT-basierte Authentifizierung
- Passwort-Hashing mit bcrypt
- Input-Validierung mit class-validator
- SQL Injection-Schutz durch Prisma ORM

---

## 📞 Support & Wartung

**Letzte Aktualisierung:** 2025-10-05
**API Version:** 1.0.0
**NestJS Version:** 11.x
**Node.js Version:** 22.x

Für technische Fragen oder Feature-Requests kontaktieren Sie das Entwicklungsteam.
