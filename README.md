# Student Feedback Management API

Backend CA project using Node.js, Express.js, MongoDB and Mongoose.

## Requirements
- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas connection string
- Postman or Thunder Client for testing

## Setup
1. Open this folder in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`.
4. Set `MONGODB_URI` in `.env` to your MongoDB connection string.
   Local example:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/StudentFeedbackDB
   PORT=5050
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

Server runs at `http://localhost:5050`.

## API endpoints

### 1. Submit feedback
`POST http://localhost:5050/api/feedback`

Body (raw JSON):
```json
{
  "studentName": "Aarav Sharma",
  "courseName": "Backend Development",
  "message": "The session was clear and useful.",
  "rating": 5
}
```
Successful response: HTTP `201 Created`. Status defaults to `Pending`.

### 2. Get feedback with pagination
`GET http://localhost:5050/api/feedback?page=1&limit=10`

Returns `feedbacks`, `currentPage`, `limit`, `totalRecords` and `totalPages`.

### 3. Update feedback status
`PATCH http://localhost:5050/api/feedback/FEEDBACK_ID`

Body (raw JSON):
```json
{
  "status": "Reviewed"
}
```
Use the `_id` returned by the POST or GET response in place of `FEEDBACK_ID`.

## GitHub
A `.gitignore` file is included to prevent uploading `node_modules` and `.env`.
Do not commit your real `.env` file or database credentials.
