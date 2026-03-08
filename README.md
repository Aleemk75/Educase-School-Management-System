# Educase - School Management System API

A simple and efficient backend API for a school management system built using **Node.js, Express, and MySQL**. This API allows you to add schools to a database and retrieve them seamlessly sorted by their proximity to a specific user's geographic location.

### 🌍 Live API URL
**Base URL:** `https://educase-school-management-system.onrender.com`
*(You can test all endpoints directly against this live server!)*

## 🚀 Key Technologies Used
- **Node.js** & **Express.js** (Fast & Minimal Web Framework)
- **MySQL2** (Promise-based MySQL client for Node)
- **Dotenv** (Environment variables management)
- **ES Modules** (`import` / `export` syntax)

---

## 🛠 Project Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MySQL](https://www.mysql.com/) server running locally or remotely

### 2. Clone the Repository
```bash
git clone https://github.com/Aleemk75/Educase-School-Management-System.git
cd "Educase - School Management System/backend"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup
Create a new MySQL database (e.g., `educase_db`) and update your environment variables.

Create a `.env` file in the `backend` folder based on `.env.example`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=educase_db
DB_PORT=3306
```

### 5. Initialize the Database Table
Run the following custom script to automatically create the required `schools` table in your database:
```bash
npm run init-db
```
*(Optional)* If you would like to automatically add 5 sample schools into your database to test the APIs, run:
```bash
node src/database/seed.js
```

### 6. Start the Server
Start the development server:
```bash
npm run dev
```

---

## 🌐 API Documentation

### 1. Health Check
Endpoint to verify the API is alive and running successfully.

- **URL:** `${BASE_URL}/health`
- **Method:** `GET`

**Success Response:**
```json
{
  "status": "OK",
  "message": "School API is running"
}
```

---

### 2. Add a School
Endpoint to add a new school to the database. Expects `name`, `address`, `latitude`, and `longitude` in the Request Body.

- **URL:** `${BASE_URL}/api/addSchool`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Request Body Example:**
```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.5916,
  "longitude": 77.2435
}
```

**Success Response (201 Created):**
```json
{
  "status": "success",
  "data": {
      "message": "School added successfully",
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi",
      "latitude": 28.5916,
      "longitude": 77.2435
  }
}
```

**Validation & Error Handling (400 Bad Request):**
- Rejects requests with missing fields
- Rejects requests with incorrectly formatted data types for coordinates

---

### 3. List Schools
Endpoint to fetch the list of all stored schools. Crucially, the schools are **sorted automatically** (nearest to furthest) based on the user's distance using the mathematical *Haversine Formula*.

- **URL:** `${BASE_URL}/api/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude` (Number, Required)
  - `longitude` (Number, Required)

**Example Request:**
```text
http://localhost:5000/api/listSchools?latitude=28.6139&longitude=77.2090
```

**Success Response (200 OK):**
```json
[
  {
    "id": 2,
    "name": "Modern School",
    "address": "Barakhamba Road, New Delhi",
    "latitude": 28.6291,
    "longitude": 77.2274,
    "distance": 2.45
  },
  {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Mathura Road, New Delhi",
    "latitude": 28.5916,
    "longitude": 77.2435,
    "distance": 4.18
  }
]
```
*(Array naturally sorted by `distance` ascending, represented in **kilometers**)*
