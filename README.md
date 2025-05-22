#  School Management API

A simple Node.js + Express + MySQL API to manage school records.

## Features
- Add new schools
- Retrieve schools sorted by distance (based on user's location)

## Installation

1. Clone or unzip the project.
2. Run `npm install` to install dependencies.
3. Create a MySQL database and table using `school.sql`.
4. Create a `.env` file with your DB credentials:
5. Run the server:

```bash
node server.js

Live API Endpoint:
➡️ Base URL: https://school-api-m85r.onrender.com


## Postman Collection

To test the APIs:

1. Open Postman. Use Postman collection to test locally on: http://localhost:3000
2. Click **Import** > **Choose Files**.
3. Select the file: `SchoolManagementAPI.postman_collection.json`.

You can now test:
- `POST /addSchool`
- `GET /listSchools?latitude=...&longitude=...`
