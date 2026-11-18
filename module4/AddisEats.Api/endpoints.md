# Addis Eats API – Endpoint Design

**Project:** Addis Eats  
**Module:** 4 – Backend Track  
**Day:** 51  
**API Version:** v1

## API Endpoint Table

| # | Method | Endpoint | Purpose | Success Code | Failure Code |
|---|---|---|---|---|---|
| 1 | GET | `/api/v1/restaurants` | Retrieve all restaurants with optional area filtering and pagination. | 200 OK | 400 Bad Request |
| 2 | GET | `/api/v1/restaurants/{id}` | Retrieve details of a specific restaurant. | 200 OK | 404 Not Found |
| 3 | POST | `/api/v1/restaurants` | Create a new restaurant. | 201 Created | 400 Bad Request |
| 4 | PATCH | `/api/v1/restaurants/{id}` | Update restaurant information. | 200 OK | 404 Not Found |
| 5 | GET | `/api/v1/restaurants/{id}/menu` | Retrieve menu items belonging to a restaurant. | 200 OK | 404 Not Found |
| 6 | GET | `/api/v1/menu-items/{id}` | Retrieve details of a specific menu item. | 200 OK | 404 Not Found |
| 7 | POST | `/api/v1/orders` | Create a new customer order. | 201 Created | 422 Unprocessable Content |
| 8 | GET | `/api/v1/orders` | Retrieve all orders with optional status and date filters. | 200 OK | 400 Bad Request |
| 9 | GET | `/api/v1/orders/{id}` | Retrieve details of a specific order. | 200 OK | 404 Not Found |
| 10 | PATCH | `/api/v1/orders/{id}/status` | Update the status of an order. | 200 OK | 409 Conflict |
| 11 | DELETE | `/api/v1/orders/{id}` | Cancel an existing order. | 204 No Content | 409 Conflict |
| 12 | POST | `/api/v1/payments/telebirr` | Initiate a payment for an order using TeleBirr. | 201 Created | 422 Unprocessable Content |
| 13 | GET | `/api/v1/payments/{id}` | Retrieve payment details and payment status. | 200 OK | 404 Not Found |
| 14 | POST | `/api/v1/auth/register` | Register a new user account. | 201 Created | 409 Conflict |
| 15 | POST | `/api/v1/auth/login` | Authenticate a user and generate an access token. | 200 OK | 401 Unauthorized |
| 16 | POST | `/api/v1/auth/logout` | Log out the authenticated user and invalidate the session or token. | 204 No Content | 401 Unauthorized |

## API Design Notes

- All endpoints use the `/api/v1` version prefix.
- Collection names use plural nouns.
- Identifiers are included in the URL path.
- Filtering, sorting, and pagination use query parameters.
- HTTP methods describe the action instead of using verbs in endpoint paths.
- POST requests return `201 Created` when a new resource is created.
- Error responses use appropriate HTTP status codes.
- Authentication is required for protected operations.

## Conclusion

The Addis Eats API follows RESTful design principles. These endpoints define the communication contract between the frontend and backend and will guide the implementation of the system throughout Module 4.