# Postman test – new application form

Set `BASE_URL` to your running server URL.

## 1. Create application
POST {{BASE_URL}}/api/user/create
Content-Type: application/json

```json
{
  "name": "Test Customer",
  "email": "test.customer@example.com",
  "phone": "+353871234567",
  "companyName": "Example Ltd",
  "companyWebsite": "https://example.com",
  "role": "Owner / founder",
  "teamSize": "2 to 5",
  "investment": "€10,000 to €20,000",
  "when": "Within 30 days",
  "challenge": "We need help converting qualified leads into sales."
}
```

Expected: HTTP 201, `error: false`, `result` containing all ten fields, plus `joinedWaitlist: false`, `waitlistJoinedAt: null`, `connected: false`, `connectedBy: "-"`. Both emails are attempted.

## 2. Required field validation
Remove `challenge` and repeat POST. Expected HTTP 400 and no new record.

## 3. Admin operations
Use existing admin authentication to GET /api/user/list and PUT /api/user/update/:userId with `{ "updateData": { "connected": true, "connectedBy": "Admin" } }`. Confirm fields are preserved.

## 4. Waitlist
For a separately created lead with `investment: "Under €10,000"`, POST /api/user/waitlist with `{ "email": "test.customer@example.com", "consent": true }` (use that lead's email). Verify joinedWaitlist and waitlistJoinedAt.

Note: A successful response confirms database save, not SMTP delivery. Inspect backend logs and inboxes for mail delivery.
