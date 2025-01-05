# Clothing Store App Backend

## Overview
This is the backend for the Clothing Store application. It is built using Node.js and Express, and it connects to a MongoDB database to manage clothing items.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd clothing-store-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root of the backend directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Clothing Items

- **GET /api/clothing**: Retrieve a list of clothing items.
- **POST /api/clothing**: Create a new clothing item.
- **PUT /api/clothing/:id**: Update an existing clothing item.
- **DELETE /api/clothing/:id**: Delete a clothing item.

## Folder Structure

- **src/**: Contains the source code for the backend.
  - **controllers/**: Request handling logic.
  - **models/**: Mongoose models for the database.
  - **routes/**: API route definitions.
  - **app.js**: Entry point for the application.

## License
This project is licensed under the MIT License.