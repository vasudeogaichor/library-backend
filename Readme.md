# Library Management System

This project is a library management system that allows users to perform various operations such as authentication, adding books, deleting books, and fetching book lists.

## Prerequisites

- Node.js v16 or higher

## Running the Project
1. Clone the repository
    ```bash
    git clone https://github.com/vasudeogaichor/library-backend
    ```
2. Install dependencies
    ```bash
    cd library-backend
    npm install
    ```
3. Set up .env file with below variables
    ```bash
    JWT_SECRET_KEY=your_secret_key
    PORT=3000
    ```
4. Start the server
    ```bash
    npm start
    ```
5. Access the API endpoints using a tool like Postman or curl. You can find the given Postman collection.


## Endpoints

### Authentication

- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Description**: Authenticate user and generate JWT token
- **Request Body**:
  ```json
    {
        "username": "john_doe",
        "password": "password123"
    }
  ```
### List Books

- **Endpoint**: `/api/books/home`
- **Method**: GET
- **Description**: List books
- **Response**:
  ```json
  {
    "books": [
        {
            "name": "Don Quixote",
            "author": "Miguel de Cervantes",
            "year": "1605"
        },
        ...
        ]
    }
  ```

### Add Books

- **Endpoint**: `/api/books/addBook`
- **Method**: POST
- **Description**: Add a new book
- **Request Body**:
    ```json
    {
        "name": "Panipat",
        "year": 1988,
        "author": "Vishwas Patil"
    }
    ```
### Delete Books

- **Endpoint**: `/api/books/deleteBook`
- **Method**: DELETE
- **Description**: Delete a book
- **Request Body**:
    ```json
    {
        "name": "Panipat"
    }
    ```