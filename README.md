# CustomAnalyticsEngine
Custom Analytics Engine for an API gateway that tracks and analyzes API usage. This engine will log and retrieve usage statistics for different APIs, their users, and patterns.
---

## 🚀 Features

-  Log API requests with endpoint, method, userId, timestamp
-  Analytics Reports:
  - API Usage Summary
  - User Activity Report
-  Filtering (by query param for time(startDate, endDate), endpoint, user)
-  Real-time aggregation (response in <500ms for 1M records)
-  Automatic log archiving after 30 days (TTL + worker job)
-  Rate limiting per user/IP (100 req/min)

---

## 🛠️ Setup Instructions

### 1. 📦 Install Dependencies

```bash
npm install

```
Create .env file and add mongodb uri as 
```
MONGO_URI = "mongodb+srv://s***:Z***I7@cluster0.h2jr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT= 3000
```
### 2. Sample API requests and responses (this may differ based on your post data)
```
GET request
http://127.0.0.1:3000/analytics/summary
Response:
{
    "totalRequestsPerEndpoints": [
        {
            "totalRequests": 1,
            "endpoint": "/logs"
        },
        {
            "totalRequests": 1,
            "endpoint": "logs"
        },
        {
            "totalRequests": 5,
            "endpoint": "/analytics/summary"
        }
    ],
    "mostAccessedEndpoint": "/analytics/summary"
}
```
sample post /logs
```
Example 1:
http://127.0.0.1:3000/logs
request body:
{
    "endpoint": "/analytics/summary",
    "method": "get",
    "userId": "ab58cf88-bfc8-4545-bb0e-982bfa7a10fd",
    "timestamp": "2025/12/20"
}

response body: with 201 created status
{
    "endpoint": "/analytics/summary",
    "method": "get",
    "userId": "ab58cf88-bfc8-4545-bb0e-982bfa7a10fd",
    "timestamp": "2025-12-19T18:30:00.000Z",
    "_id": "6802873d3e596c736810cdbe",
    "__v": 0
}


Example 2:
request body:
{
    "endpoint": "/analytics/summary",
    "method": "git",
    "userId": "ab58cf88-bfc8-4545-bb0e-982bfa7a10fd",
    "timestamp": "2025/12/20"
}
response body: with 400 bad request
{
    "success": false,
    "message": "Provide valid method type."
}
```
Sample GET Request http://127.0.0.1:3000/analytics/user/:userId
```

http://127.0.0.1:3000/analytics/user/ab58cf88-bfc8-4545-bb0e-982bfa7a10fd

Response body: with total requests count and distinct endpoints
[
    {
        "totalRequests": 8,
        "endpoints": [
            "/logs",
            "logs",
            "/analytics/summary"
        ]
    }
]

```
## MongoDB Schema Design
```
Field	      Type	    Description
endpoint	String	  Requested endpoint (e.g., /api/users)
method	    String	  HTTP method (GET, POST, etc.)
userId	    String	  UUID of the API user
timestamp Date	    Time of the request
```


