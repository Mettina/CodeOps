Exe 1: What is a Server?

Think of a server like a waiter at a busy restaurant. When you open a website, watch a video, or check your email, your phone acts like a customer placing an order. The waiter is always at work, listening for orders day and night. When yours arrives, the waiter fetches exactly what you asked for, whether files, images, or messages, from the kitchen where everything is stored, and brings it back to your table in a split second. Thousands of customers can order at the same time, and the waiter serves every one of them smoothly.


Exe 2: Three requests from the browser network tab

Request 1
  Method: GET
  Full path: /w/load.php?modules=skins.vector.icons&image=heart&format=original&lang=en&skin=vector-2022&version=mwqkz
  Status code: 200 (from disk cache)
  Request body? no

Request 2
  Method: GET
  Full path: /static/favicon/wikipedia.ico
  Status code: 200 (from disk cache)
  Request body? no

Request 3
  Method: POST
  Full path: /ins-502b/v2/events?hasty=true
  Status code: 202 Accepted
  Request body? yes


Exe 3: Headers for Request 1
GET /w/load.php?modules=skins.vector.icons&image=heart&format=original&lang=en&skin=vector-2022&version=mwqkz

Request headers
- Origin: https://en.wikipedia.org : the site the request came from.
- Referer: https://en.wikipedia.org/w/load.php?... : the stylesheet that triggered this request.
- Sec-Ch-Ua-Platform: "Windows" : the operating system the browser runs on.
- User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/157.0.0.0 : identifies the browser and OS.

Response headers
- Content-Type: image/svg+xml : the body is an SVG image, so the browser renders it as one.
- Cache-Control: public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=60 : browsers and CDNs may reuse it for 30 days without asking again.
- Content-Encoding: gzip : the body is compressed, and the browser decompresses it before use.
- Vary: Accept-Encoding,User-Agent : the cached copy depends on those request headers, so caches don't serve the wrong version.


Exe 4: Hand-written HTTP request

POST /api/v1/orders HTTP/1.1
Host: api.addiseats.et
Content-Type: application/json
Content-Length: 95
Authorization: Bearer eyJhbGciOi...

{"restaurantId":14,"area":"Bole","paymentMethod":"telebirr","items":[{"menuItemId":7,"qty":2}]}


Exe 5: Status codes

(a) List of restaurants returned: 200 OK. The request worked and the response carries the data.
(b) Order created: 201 Created. A new resource now exists because of this request.
(c) Order cancelled, nothing returned: 204 No Content. The action succeeded and there is no body to send back.
(d) qty arrives as "two": 400 Bad Request. The body is malformed (qty must be a number), so the caller must fix it.
(e) Auth token expired: 401 Unauthorized. The client isn't properly authenticated and must log in again.
(f) Courier tries to edit a menu: 403 Forbidden. The user is logged in, but their role isn't allowed to do this.
(g) Order 99999 doesn't exist: 404 Not Found. There is no resource at that ID.
(h) Unhandled exception: 500 Internal Server Error. The failure is the server's fault, not the client's.


Exe 6: Wikimedia (Wikipedia) REST API
Example endpoint: GET https://en.wikipedia.org/api/rest_v1/page/summary/{title}

Three things its contract promises
1. Machine-readable content. The API gives cacheable, JSON access to Wikipedia content. The summary endpoint returns fields like titles, pageid and extract, so a program can read it without scraping HTML.
2. Clear usage rules. Clients must stay under 200 requests per second and must send a unique User-Agent (or Api-User-Agent) header that lets Wikimedia contact them.
3. Stated licensing and stability. Content is licensed CC-BY-SA 3.0 and GFDL unless an endpoint says otherwise. Each endpoint also carries a stability marker; for example, the plain title field is marked deprecated in favor of titles.normalized.

One thing it does not document that I would want to know
The global rules I found say nothing about uptime or response time (no SLA). Before building something that has to work every time, I would want to know how reliable and how fast it is, and what clients should do when it is down or slow.