# podium-platform

Web platform for the Podium app. Currently handles email verification and serves a simple landing page.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

## Key routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/verify?token=<token>` | Email verification page — linked from the verification email sent by the Podium backend |
| `POST /api/verify-email` | API route that validates an email verification token |

## Email verification flow

1. The Podium backend sends a verification email containing a link to `/verify?token=<token>`.
2. The user clicks the link and the `/verify` page automatically posts the token to `/api/verify-email`.
3. The API route validates the token against the database and marks the email as verified.

> **Note:** The `verifyToken` function in `app/api/verify-email/route.ts` is currently a stub. Replace it with a real database lookup before going to production.
