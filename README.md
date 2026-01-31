# Startup Benefits Platform

This project is a full-stack Startup Benefits and Partnerships Platform that I built to understand how real startup deal platforms work in practice.

Early-stage startups usually cannot afford premium SaaS tools. The idea behind this platform is to give startups access to exclusive SaaS deals, where some deals are open to everyone and some require verification before claiming.

The main focus of this project is not adding too many features, but building the correct flow with proper authentication, authorization, and backend validation.

---

## Tech Stack Used

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion for animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT-based authentication

---

## How the Application Works

1. Users land on the homepage where they can register or log in directly.
2. All deals are visible on the deals page without authentication.
3. Deals are marked as public or locked.
4. Claiming a deal requires the user to be logged in.
5. Locked deals can only be claimed by verified users.
6. Users can see their profile and claimed deals on the dashboard.

---

## Authentication and Authorization

- JWT is generated when a user logs in or registers.
- The token is stored on the client and sent with protected API requests.
- A middleware verifies the token on the backend.
- Authorization checks (like locked deal access) are handled at the backend level.

---

## Claim Flow (Backend Logic)

1. User clicks on "Claim Deal".
2. Backend checks:
   - If the user is authenticated
   - If the deal exists and is active
   - If the deal is locked and the user is verified
   - If the user has already claimed the deal
3. If all checks pass, a claim is created with status set to `pending`.
4. Claimed deals appear on the user dashboard.

---

## Frontend and Backend Interaction

- Frontend communicates with backend using REST APIs.
- Public APIs are used for browsing deals.
- Protected APIs require a valid JWT token.
- Backend responses directly control what the user sees on the UI.

---

## UI and Animations

- Landing page has an animated hero section.
- Hover and button interactions are added for better user experience.
- Locked deals are clearly shown as restricted.
- Loading and empty states are handled properly.
- Animations are kept minimal and purposeful.

---

## Data Models

- User: stores authentication and verification status.
- Deal: stores deal details and access level.
- Claim: links users and deals with a claim status.

---

## Known Limitations

- Startup verification is simulated using a boolean flag.
- There is no admin panel for managing deals.
- Email verification and password reset are not implemented.
- Deals are added manually for demonstration.

---

## Possible Improvements

- Add an admin dashboard to manage deals.
- Implement a proper startup verification workflow.
- Improve error handling and logging.
- Add pagination and search optimization.
- Store tokens using HTTP-only cookies.
- Add automated tests.

---

## Final Note

This project was built to focus on correct flow, backend validation, and clear separation of concerns rather than adding unnecessary features.
