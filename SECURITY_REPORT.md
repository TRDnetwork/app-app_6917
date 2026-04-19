# Security Scan Report

## Critical Issues
- **Exposed API Keys**  
  - File: `server.js`  
  - Issue: While the Resend API key is correctly referenced via `process.env.RESEND_API_KEY`, there is no validation or error handling in the email sending logic that could lead to accidental exposure in error responses.  
  - Fix: Ensure error responses do not leak any environment details. Wrap all error outputs with generic messages.

- **Missing Rate Limiting**  
  - File: `server.js`  
  - Issue: The `/api/contact` endpoint has no rate limiting, making it vulnerable to spam or DoS attacks even with a honeypot.  
  - Fix: Add rate limiting using `express-rate-limit` to restrict repeated submissions from the same IP.

- **Insecure Headers (Missing Security Middleware)**  
  - File: `server.js`  
  - Issue: No use of security headers (e.g., CSP, X-Frame-Options). The app uses Express but lacks `helmet` middleware.  
  - Fix: Add `helmet` to set secure HTTP headers.

## Warnings
- **CORS Misconfiguration**  
  - File: `server.js`  
  - Issue: `app.use(cors())` allows all origins (`*`) by default, which is unsafe in production.  
  - Fix: Configure `cors` with explicit `origin` whitelist in production.

- **Error Message Data Exposure**  
  - File: `server.js`  
  - Issue: Internal server errors log full stack traces and return generic 500s, but if misconfigured, could expose system info.  
  - Fix: Ensure no sensitive data (like API keys) is logged or returned.

- **Missing Input Sanitization for HTML Emails**  
  - File: `server.js`  
  - Issue: User input (`name`, `email`, `message`) is directly inserted into HTML email without sanitization.  
  - Fix: Sanitize `message` content before rendering in HTML email to prevent potential XSS in email clients.

## Passed Checks
- SQL Injection: Not applicable — no database queries.
- XSS in Frontend: No use of `innerHTML` or unsafe DOM manipulation in provided frontend code.
- Path Traversal: Not applicable — no file system access.
- Authentication Issues: Not applicable — no auth system.
- Insecure Dependencies: No known vulnerable versions detected in `package.json` (based on current public CVE data).
- Data Exposure in Console: Only non-sensitive logs present.

---