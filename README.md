# SIT313 P5 Newsletter — DEV@Deakin

This project extends the supplied DEV@Deakin React/Vite frontend and reuses the P2 Express/Mailjet newsletter endpoint.

## Project folders
- `frontend/`: existing React website with the P5 newsletter form on the homepage.
- `backend/`: Express API with `POST /api/subscribe` and Mailjet integration.
- `REPORT-TEMPLATE.md`: report structure and screenshot checklist.

## 1. Configure the backend
1. Open a terminal in `backend`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Put your real Mailjet public key, private key, and verified sender email in `backend/.env`. Never commit this file.
5. Run `npm run dev` (or `npm start`). The server should report that it is running on port 3000.
6. Check `http://localhost:3000/api/health` in a browser; it should return a JSON success message.

## 2. Configure the frontend
1. Open a second terminal in `frontend`.
2. Run `npm install` to install dependencies and reconcile the lockfile if needed.
3. Copy `.env.example` to `.env.local`.
4. Fill in the Firebase values you already use for P4. Keep `VITE_API_BASE_URL=http://localhost:3000` for local development.
5. Run `npm run dev` and open the Vite URL, normally `http://localhost:5173`.

## 3. Test the newsletter
1. Make sure both servers are running.
2. On the homepage, enter a valid email address and click Subscribe.
3. Check that the website shows a success message and that the recipient mailbox receives the welcome email.
4. In the backend terminal, capture the actual `Mailjet Status:` line. Do not fake or manually print a success status. Mailjet's provider response and the Express response are separate: the API returns 202 to the frontend after the provider request succeeds.
5. Test an invalid email and a repeated email to confirm the 400 and 409 responses. A failed email-provider request returns 502.

## Important notes
- The in-memory duplicate list resets when the backend restarts. It is suitable only for this coursework demonstration; a persistent database would be needed for a production newsletter.
- Make sure the sender address is verified in Mailjet.
- Do not upload `.env`, API keys, passwords, `node_modules`, or `.git` folders to the submission repository.
- Create a GitLab project named `Task P5` with visibility `Internal`, then commit all source files with meaningful commit messages.
- The report screenshots and video link must be your real evidence after you run and test the project. They cannot be truthfully generated from source code alone.
