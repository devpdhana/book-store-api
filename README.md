# 📚 BookStore API

A robust RESTful API for managing a bookstore with role-based access control (RBAC). Built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

# Install dependencies

npm install

# Start development server

npm run dev

# Start production server

npm start

Make sure to set up your `.env` file with the required environment variables:

env file config---
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000

## 🔑 Authentication

### Register a New User

```http
POST /api/auth/register
```

**Request:**

```json
{
  "username": "dhana",
  "email": "dhana@example.com",
  "password": "**********",
  "role": "admin" //By default the role is user if you won't mention the role in the payload data it will be user. If you want to create an admin make sure to mention the role as admin
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "dhana",
    "email": "dhana@test.com",
    "role": "user"
  }
}
```

### Login

```http
POST /api/auth/login
```

**Request:**

```json
{
  "email": "dhana@test.com",
  "password": "********"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "dhana",
    "email": "dhana@test.com",
    "role": "user"
  }
}
```

## 📚 Books

### Get All Books

```http
GET /api/books
```

**Response:**

```json
[
  {
    "id": "user_id", //{507f1f77bcf86cd799439011}
    "title": "Learn backend with dhana",
    "author": "Dhanasekar E",
    "description": "Backend with rest api",
    "price": 999,
    "stock": 30
  }
]
```

### Get Book by ID

```http
GET /api/books/:id
```

**Response:**

```json
{
  "id": "user_id", //{507f1f77bcf86cd799439011}
  "title": "Learn backend with dhana",
  "author": "Dhanasekar E",
  "description": "Backend with rest api",
  "price": 999,
  "stock": 30
}
```

### Create Book (Admin Only)

```http
POST /api/books
Authorization: Bearer <token>
```

**Request:**

```json
{
  "title": "Learn backend with dhana",
  "author": "Dhanasekar E",
  "description": "Backend with rest api",
  "price": 999,
  "stock": 30
}
```

### Update Book (Admin Only)

```http
PUT /api/books/:id
Authorization: Bearer <token>
```

**Request:**

```json
{
  "stock": 45,
  "price": 11.99
}
```

### Delete Book (Admin Only)

```http
DELETE /api/books/:id
Authorization: Bearer <token>
```

## 🛒 Orders

### Get All Orders

```http
GET /api/orders
Authorization: Bearer <token>
```

**Response:**

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "user": {
      "username": "dhana",
      "email": "dhana@test.com"
    },
    "book": {
      "title": "Learn Backend with dhana",
      "author": "Dhanasekar E",
      "price": 999
    },
    "quantity": 1,
    "totalPrice": 999,
    "status": "pending"
  }
]
```

### Create Order

```http
POST /api/orders
Authorization: Bearer <token>
```

**Request:**

```json
{
  "bookId": "book_id", //{507f1f77bcf86cd799439011}
  "quantity": 2
}
```

### Update Order Status (Admin Only)

```http
PUT /api/orders/:id
Authorization: Bearer <token>
```

**Request:**

```json
{
  "status": "completed"
}
```

## 👥 Users

### Get All Users (Admin Only)

```http
GET /api/users
Authorization: Bearer <token>
```

### Get User by ID

```http
GET /api/users/:id
Authorization: Bearer <token>
```

### Update User (Admin Only)

```http
PUT /api/users/:id
Authorization: Bearer <token>
```

**Request:**

```json
{
  "username": "dhana",
  "email": "dhana@test.com",
  "role": "admin"
}
```

### Delete User (Admin Only)

```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

## 🔒 Authentication Headers

For protected routes, include the JWT token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

## 📝 Notes

- Regular users can only view books and create orders
- Admin users have full access to all endpoints
- JWT tokens expire after 24 hours
- All timestamps are in ISO 8601 format
- Prices are in USD

## ⚠️ Error Responses

```json
{
  "message": "Error message here"
}
```

HTTP Status Codes used in this application:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## 🔧 Development

This project follows clean architecture principles and uses:

- Express.js for routing
- MongoDB with Mongoose for data storage
- JWT for authentication
- Express Validator for request validation
- CORS enabled for cross-origin requests
