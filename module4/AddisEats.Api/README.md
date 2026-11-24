# Addis Eats API

ASP.NET Core Web API (controllers) behind the Addis Eats frontend.
IBT CodeOps, .NET track. Capstone repository, started on Day 55.

## Run it

```powershell
git clone <repo-url>
cd <repo>\AddisEats.Api
dotnet run --launch-profile https
```

Swagger UI: **https://localhost:7129/swagger**
If the browser warns about the certificate, run `dotnet dev-certs https --trust` once.

## Capstone endpoints (Day 55)

Base path `/api/v1`. All money is in ETB and stored as `decimal`.

| Method | Path | Query parameters | Success | Failure |
|---|---|---|---|---|
| GET | `/restaurants` | `area` (optional, case-insensitive), `page` (default 1), `limit` (default 20) | 200 OK | 400 if `page` or `limit` is below 1 |
| GET | `/restaurants/{id}` | none | 200 OK | 404 if the restaurant does not exist |
| GET | `/restaurants/{id}/menu` | `category` (optional, case-insensitive) | 200 OK (an empty array if nothing matches) | 404 if the restaurant does not exist |

### Response shapes

`GET /restaurants` returns an envelope:

```json
{
  "data": [ { "id": 1, "name": "Abay Grill", "area": "Bole", "deliveryFeeEtb": 60 } ],
  "page": 1,
  "pageSize": 20,
  "total": 12
}
```

`GET /restaurants/{id}` returns one restaurant with the same four fields.
`GET /restaurants/{id}/menu` returns an array of `{ id, name, category, priceEtb }`.

Results are ordered by name before paging, so page 2 never repeats a row from page 1.

### 404 versus an empty list

A restaurant that does not exist returns **404**: the client asked about something that is not there.
A restaurant that exists but has no items matching the filter returns **200 with `[]`**: the answer is truthful and nothing failed.
Example: `GET /restaurants/2/menu?category=Dessert` returns `200` and `[]`; `GET /restaurants/9999/menu` returns `404`.

## Design

```
AddisEats.Api/
  Controllers/  Read the request, delegate, return a status code. No business rules.
  Services/     IRestaurantService, IRestaurantMenuService and their implementations.
  Models/       Entities (Restaurant, RestaurantMenuItem) and Models/Dtos (what HTTP sees).
  Data/         InMemoryDb and SeedData: 12 restaurants in 4 areas, 6 menu items each.
  Program.cs    Wiring only: service registration and the middleware pipeline.
```

- Controllers return DTOs, never entities. `OwnerPhone` and `CommissionRate` never leave the server.
- Services are registered **scoped**. The data lives in `InMemoryDb`, a **singleton**, because a scoped service is rebuilt on every request.
- CORS allows `http://localhost:3000` and `http://localhost:5173` (`app.UseCors` runs before `MapControllers`).
- `AddisEats.Api.http` holds saved requests, including the 404 and empty-menu cases.

## Earlier days (Day 54)

| Method | Path | Success | Failure |
|---|---|---|---|
| GET | `/api/v1/menu?category=&page=&pageSize=` | 200 | 400 |
| GET | `/api/v1/menu/{id}` | 200 | 404 |
| POST | `/api/v1/menu` | 201 with `Location` header | 400 (price at or below 0) |
| GET | `/api/v1/health` | 200 | none |

The `/api/v1/lab/*` endpoints are Day 54 experiments (lifetimes, payment providers, options, DI errors, middleware order). Notes are in `docs/`.

`bin/` and `obj/` are excluded by `.gitignore`.