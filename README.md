# Galaxy Com API Documentation

## 📌 Introduction
Galaxy Com API powers an eCommerce platform for a computer store, featuring dynamic product listings and a user-friendly interface. The application integrates multiple technologies to offer a seamless shopping experience for users.

## 🚀 Base URL
```
http://localhost:3000/api
```

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind, Vite
- **Backend**: Express, Sequelize, Axios
- **Database**: PostgreSQL
- **Authentication**: Firebase, Google Sign-In, JWT
- **Security**: bcrypt for password hashing
- **AI**: Gemini API
- **Payments**: Midtrans
- **Testing**: Jest, Supertest
- **Hosting**: AWS
- **External APIs**: DummyJSON API

## 📦 Models

### **User**
```json
{
  "email": "string",
  "password": "string"
}
```
- `email`: string, required, unique, must be in email format.
- `password`: string, required (hashed using bcrypt before saving to the database).

### **Cart**
```json
{
  "UserId": "integer",
  "ProductId": "integer",
  "quantity": "integer"
}
```
- `UserId`: integer, required.
- `ProductId`: integer, required.
- `quantity`: integer, default 0.

### **Product**
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "price": "integer",
  "discountPercentage": "integer",
  "rating": "integer",
  "stock": "integer",
  "images": "string",
  "tags": "string"
}
```

## 🔗 Endpoints

### **User**
- `POST /register` - Register a new user.
- `POST /login` - Login and get authentication token.

### **Cart**
- `GET /carts` - Retrieve all cart items.
- `POST /carts/:productId` - Add a product to cart.
- `PUT /carts/:id` - Update cart item quantity.
- `DELETE /carts/:id` - Remove an item from the cart.

### **Product**
- `GET /products` - Retrieve all products.
- `GET /products/:id` - Retrieve a single product by ID.
- `POST /products` - Add a new product.
- `DELETE /products/:id` - Delete a product (requires authorization).

---

## 🛠️ Authentication
This API uses **JWT (JSON Web Token) Authentication**. Every protected request must include the `Authorization` header:

```json
{
  "Authorization": "Bearer <your-token>"
}
```
### **Password Security**
- Passwords are **hashed using bcrypt** before being stored in the database.
- When a user logs in, the provided password is compared against the hashed password in the database.

---

## 📌 Dummy Credit/Debit Cards for Testing in Midtrans
| Card Type | Card Number        | Expiry Date | CVV  |
|-----------|--------------------|-------------|------|
| **VISA**  | 4811 1111 1111 1114 | 12/25       | 123  |
| **Mastercard** | 5211 1111 1111 1117 | 12/25 | 123  |
| **JCB** | 3565 1111 1111 1113 | 12/25 | 123  |
| **AMEX** | 3711 1111 1111 114 | 12/25 | 123  |

---

## 📌 API Endpoints

### **POST /register**
#### Request:
```json
{
  "email": "string",
  "password": "string"
}
```
#### Processing:
- Password will be **hashed using bcrypt** before saving to the database.

#### Responses:
✅ `201 Created`
```json
{
  "id": "integer",
  "email": "string"
}
```
❌ `400 Bad Request`
```json
{
  "message": "Email is required"
}
```
---

### **POST /login**
#### Request:
```json
{
  "email": "string",
  "password": "string"
}
```
#### Processing:
- The provided password is **compared with the hashed password** stored in the database using bcrypt.
- If valid, a **JWT token** is generated and returned.

#### Responses:
✅ `200 OK`
```json
{
  "access_token": "string"
}
```
❌ `401 Unauthorized`
```json
{
  "message": "Invalid email/password"
}
```
---

### **GET /carts**
#### Request Headers:
```json
{
  "Authorization": "Bearer <your-token>"
}
```
#### Responses:
✅ `200 OK`
```json
[
  {
    "id": 1,
    "UserId": 1,
    "ProductId": 2,
    "quantity": 3,
    "Product": {
      "name": "Eyeshadow Palette with Mirror",
      "price": 50000,
      "imageUrl": "https://example.com/product_a.jpg"
    }
  }
]
```

---

## 🔥 Global Error Handling

### Unauthorized (401)
```json
{
  "message": "Invalid token"
}
```

### Internal Server Error (500)
```json
{
  "message": "Internal server error"
}
```


### 📌 Notes
- Ensure to replace `<your-token>` with a valid JWT token.
- Use `Bearer` authentication for protected routes.
- Passwords are securely hashed using bcrypt.
- More features and enhancements are coming soon!


