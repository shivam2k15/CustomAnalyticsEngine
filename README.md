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
