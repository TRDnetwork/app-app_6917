# Portfolio Site Tests

## How to Run
1. Install dependencies: `npm install vitest jsdom @testing-library/react @testing-library/dom`
2. Run tests: `npm test`

## Test Coverage
- **app.test.js**: Unit tests for frontend components using Vitest and Testing Library
  - Verifies hero section content and structure
  - Tests about section paragraph rendering
  - Validates project cards display correct information
  - Checks contact form validation logic
  - Tests form submission flow

- **api.test.js**: Tests for the Vercel serverless contact form API
  - Validates HTTP method handling (only POST allowed)
  - Tests input validation for required fields
  - Verifies successful email sending with Resend
  - Tests error handling for failed email delivery

The tests ensure the portfolio site meets all acceptance criteria including proper rendering of all sections, functional contact form with validation, and correct API integration for form submissions.