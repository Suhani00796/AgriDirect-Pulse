# API Endpoints Reference

## Base URL
```
http://localhost:8080
```

## Authentication Endpoints

### Send OTP
**POST** `/api/v1/auth/send-otp`

Request:
```json
{
  "phone": "9876543210"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### Verify OTP
**POST** `/api/v1/auth/verify-otp`

Request:
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user123",
    "phone": "9876543210",
    "name": "John Farmer"
  }
}
```

---

## Prices Endpoints

### Get Prices
**GET** `/api/v1/prices?crop=wheat&district=Punjab`

Query Parameters:
- `crop` (optional) - Crop name
- `district` (optional) - District name

Response:
```json
[
  {
    "id": "price1",
    "crop": "Wheat",
    "price": 2450,
    "district": "Punjab",
    "change": 2.5,
    "timestamp": "2026-04-30T10:30:00Z"
  }
]
```

---

## Marketplace Endpoints

### Get Listings
**GET** `/api/v1/listings?page=1&limit=10`

Query Parameters:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

Response:
```json
[
  {
    "id": "listing1",
    "crop": "Tomato",
    "location": "Mumbai",
    "price": 45,
    "quantity": 50,
    "unit": "kg",
    "description": "Fresh organic tomatoes",
    "image": "https://...",
    "sellerId": "user123",
    "createdAt": "2026-04-30T10:30:00Z"
  }
]
```

### Post Listing
**POST** `/api/v1/listings`

Headers:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Request:
```json
{
  "crop": "Tomato",
  "location": "Mumbai",
  "price": 45,
  "quantity": 50,
  "unit": "kg",
  "description": "Fresh organic tomatoes",
  "image": "https://..."
}
```

Response:
```json
{
  "success": true,
  "id": "listing1",
  "message": "Listing created successfully"
}
```

---

## Calculator Endpoints

### Calculate Logistics Cost
**POST** `/api/v1/calculate-logistics`

Request:
```json
{
  "originPin": "400001",
  "destinationPin": "411001",
  "weight": 100
}
```

Response:
```json
{
  "baseCost": 5000,
  "distance": 480,
  "taxes": 900,
  "totalCost": 5900,
  "costPerKg": 59
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid input",
  "details": "Phone number must be 10 digits"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

## Rate Limiting

All endpoints support rate limiting headers:
- `X-RateLimit-Limit: 100`
- `X-RateLimit-Remaining: 95`
- `X-RateLimit-Reset: 1619784000`

---

## Caching Strategy

### CacheFirst (Prices)
- Served from cache first
- Updates cache in background
- Max age: 30 minutes

### NetworkFirst (Listings)
- Network request first
- Falls back to cache if offline
- Network timeout: 10 seconds

---

## Testing with cURL

```bash
# Send OTP
curl -X POST http://localhost:8080/api/v1/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210"}'

# Verify OTP
curl -X POST http://localhost:8080/api/v1/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"9876543210","otp":"123456"}'

# Get Prices
curl http://localhost:8080/api/v1/prices?crop=wheat

# Get Listings with Auth
curl http://localhost:8080/api/v1/listings \
  -H "Authorization: Bearer <JWT_TOKEN>"

# Post Listing
curl -X POST http://localhost:8080/api/v1/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "crop":"Tomato",
    "location":"Mumbai",
    "price":45,
    "quantity":50,
    "unit":"kg",
    "description":"Fresh tomatoes"
  }'
```

---

## Implementation Notes

1. All timestamps use ISO 8601 format (UTC)
2. Prices are in Indian Rupees (₹)
3. Quantities use metric units (kg, liters, etc.)
4. Images should be served with proper CORS headers
5. Phone numbers should be validated server-side
6. OTP should expire after 10 minutes
7. JWT tokens should expire after 24 hours
