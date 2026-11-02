# Postman / Thunder Client testing checklist

Start the backend first with `npm run dev`.

## POST - Submit feedback
- Method: POST
- URL: `http://localhost:5050/api/feedback`
- Header: `Content-Type: application/json`
- Body -> raw -> JSON:
```json
{
  "studentName": "Aarav Sharma",
  "courseName": "Backend Development",
  "message": "The session was helpful.",
  "rating": 5
}
```
Expected: `201 Created`, saved feedback and default status `Pending`.

Try rating `6` to verify validation; expected `400 Bad Request`.

## GET - Retrieve feedback with pagination
- Method: GET
- URL: `http://localhost:5050/api/feedback?page=1&limit=5`
Expected: `200 OK`, `currentPage`, `totalRecords`, `totalPages`, and `feedbacks`.

## PATCH - Update feedback status
- Method: PATCH
- URL: `http://localhost:5050/api/feedback/PASTE_FEEDBACK_ID_HERE`
- Header: `Content-Type: application/json`
- Body -> raw -> JSON:
```json
{
  "status": "Reviewed"
}
```
Expected: `200 OK` and updated feedback. Use the actual `_id` from POST/GET.
