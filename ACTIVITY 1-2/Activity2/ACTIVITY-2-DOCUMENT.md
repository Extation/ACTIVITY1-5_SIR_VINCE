# ACTIVITY 2: Lanesra Note Application

---

## Title of Activity
**Lanesra Note - Secure Note-Taking Web Application with Password Recovery**

---

## Description

Lanesra Note is a full-stack web application that allows users to securely create, manage, and organize personal notes. The application features a complete authentication system including user registration, login, and a comprehensive password recovery system using email verification.

**Key Features:**
- **User Authentication:** Secure registration and login with JWT tokens
- **Password Recovery:** 3-step password reset process with email verification
  - Email input → 6-digit code sent to email → Code verification → New password creation
- **Note Management:** Create, read, update, and delete personal notes
- **Real-time Search:** Quickly find notes by title or content
- **Email Integration:** Real Gmail SMTP integration for password reset emails
- **Modern UI:** Clean, responsive interface with gradient design
- **API Documentation:** Interactive Swagger UI for API testing

**Technology Stack:**
- **Frontend:** React 18 + TypeScript + React Router
- **Backend:** NestJS + TypeScript + TypeORM
- **Database:** SQLite (development)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer with Gmail SMTP
- **API Docs:** Swagger/OpenAPI

---

## Screenshots of Working System

### User Interface Screenshots

#### 1. Registration Screen
![Registration](screenshots/registration.png)
*New users can create an account with email, username, and password*

#### 2. Login Screen
![Login](screenshots/login.png)
*Secure login with "Forgot Password?" link centered below password field*

#### 3. Forgot Password - Email Input
![Forgot Password](screenshots/forgot-password.png)
*Users enter their registered email to receive a reset code*

#### 4. Email with 6-Digit Reset Code
![Email Code](screenshots/email-reset-code.png)
*Professional HTML email with 6-digit verification code (expires in 15 minutes)*

#### 5. Verify Reset Code
![Verify Code](screenshots/verify-code.png)
*Enter the 6-digit code received via email*

#### 6. Reset Password with Indicators
![Reset Password](screenshots/reset-password.png)
*Create new password with:*
- *Password strength indicator (Weak/Medium/Strong)*
- *Real-time password match validation*
- *Requirements checklist*

#### 7. Dashboard - Empty State
![Dashboard Empty](screenshots/dashboard-empty.png)
*Clean interface welcoming new users to create their first note*

#### 8. Dashboard with Notes
![Dashboard Notes](screenshots/dashboard-with-notes.png)
*View all notes with search functionality and note management options*

#### 9. Create Note Modal
![Create Note](screenshots/create-note.png)
*Simple modal to create new notes with title and content*

#### 10. Edit Note Modal
![Edit Note](screenshots/edit-note.png)
*Edit existing notes with pre-filled content*

---

### API Examples (Swagger UI)

#### 11. Swagger API Documentation
![Swagger UI](screenshots/swagger-main.png)
*Interactive API documentation at http://localhost:3004/api*

#### 12. POST /auth/register - Create Account
![API Register](screenshots/api-register.png)
```json
Request:
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201 Created):
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 13. POST /auth/login - User Login
![API Login](screenshots/api-login.png)
```json
Request:
{
  "username": "john@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 14. POST /auth/forgot-password - Request Password Reset
![API Forgot Password](screenshots/api-forgot-password.png)
```json
Request:
{
  "email": "john@example.com"
}

Response (200 OK):
{
  "message": "If this email exists, a reset code has been sent. Please check your email."
}
```

#### 15. POST /auth/verify-reset-code - Verify Code
![API Verify Code](screenshots/api-verify-code.png)
```json
Request:
{
  "email": "john@example.com",
  "code": "123456"
}

Response (200 OK):
{
  "message": "Reset code verified successfully.",
  "valid": true
}
```

#### 16. POST /auth/reset-password - Reset Password
![API Reset Password](screenshots/api-reset-password.png)
```json
Request:
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "newPassword123"
}

Response (200 OK):
{
  "message": "Password has been reset successfully. You can now login with your new password."
}
```

#### 17. POST /notes - Create Note (Authenticated)
![API Create Note](screenshots/api-create-note.png)
```json
Request:
{
  "title": "My First Note",
  "content": "This is the content of my note."
}

Response (201 Created):
{
  "id": 1,
  "title": "My First Note",
  "content": "This is the content of my note.",
  "userId": 1,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### 18. GET /notes - Get All Notes (Authenticated)
![API Get Notes](screenshots/api-get-notes.png)
```json
Response (200 OK):
[
  {
    "id": 1,
    "title": "My First Note",
    "content": "This is the content of my note.",
    "userId": 1,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

#### 19. PUT /notes/:id - Update Note (Authenticated)
![API Update Note](screenshots/api-update-note.png)
```json
Request:
{
  "title": "Updated Title",
  "content": "Updated content."
}

Response (200 OK):
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content.",
  "userId": 1,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

#### 20. DELETE /notes/:id - Delete Note (Authenticated)
![API Delete Note](screenshots/api-delete-note.png)
```json
Response (200 OK):
{
  "message": "Note deleted successfully"
}
```

---

## Instructions on How to Run the Project

### Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** version 18 or higher
- **npm** (comes with Node.js)
- **Gmail account** (for email functionality)

---

### Step 1: Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Activity2/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment configuration file:**
   
   Create a file named `.env` in the `Activity2/backend/` directory with the following content:
   
   ```env
   # Database Configuration
   DB_TYPE=sqlite
   DB_DATABASE=notes.db

   # JWT Secret Key
   JWT_SECRET=your_secret_key_here_change_in_production

   # Gmail SMTP Configuration
   EMAIL_USER=lanesrateam@gmail.com
   EMAIL_PASSWORD=azdf xvmf vtok mlvk

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000

   # Server Port
   PORT=3004
   ```

   **Note:** If you want to use your own Gmail account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification
   - Generate an App Password
   - Replace `EMAIL_USER` and `EMAIL_PASSWORD` with your credentials

4. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

   **Expected Output:**
   ```
   [Nest] LOG [NestFactory] Starting Nest application...
   [Nest] LOG [InstanceLoader] AppModule dependencies initialized
   ✅ Email server is ready to send messages
   [Nest] LOG [NestApplication] Nest application successfully started
   ```

   ✅ **Backend is now running at:** `http://localhost:3004`
   
   ✅ **Swagger API documentation at:** `http://localhost:3004/api`

---

### Step 2: Frontend Setup

1. **Open a new terminal window**

2. **Navigate to the frontend directory:**
   ```bash
   cd Activity2/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the frontend application:**
   ```bash
   npm start
   ```

   **Expected Output:**
   ```
   Compiled successfully!
   
   You can now view the app in the browser.
   
   Local:            http://localhost:3000
   On Your Network:  http://192.168.x.x:3000
   ```

   ✅ **Frontend is now running at:** `http://localhost:3000`

---

### Step 3: Test the Application

#### Testing the User Interface:

1. **Open your browser** and navigate to `http://localhost:3000`

2. **Register a new account:**
   - Click "Register here" link
   - Enter email, username, and password
   - Click "REGISTER" button
   - You'll be redirected to the login page

3. **Test the password recovery feature:**
   - On the login page, click "Forgot Password?"
   - Enter your registered email address
   - Click "SEND RESET CODE"
   - Check your email inbox for the 6-digit code
   - Enter the code on the verification page
   - Create a new password with the strength indicator
   - Verify the password match indicator turns green
   - Click "RESET PASSWORD"
   - Login with your new password

4. **Create and manage notes:**
   - After logging in, click "+ Create Note"
   - Enter a title and content
   - Click "CREATE NOTE"
   - Your note will appear on the dashboard
   - Click on a note to edit it
   - Click the trash icon to delete a note

5. **Test the search functionality:**
   - Create multiple notes
   - Use the search bar to find specific notes

#### Testing the API with Swagger:

1. **Open Swagger UI** in your browser: `http://localhost:3004/api`

2. **Test authentication endpoints:**
   - Expand `POST /auth/register`
   - Click "Try it out"
   - Enter test user data
   - Click "Execute"
   - Copy the `access_token` from the response

3. **Authorize for protected endpoints:**
   - Click the "Authorize" button at the top of Swagger UI
   - Enter: `Bearer [your_access_token]`
   - Click "Authorize"

4. **Test note endpoints:**
   - Try `POST /notes` to create a note
   - Try `GET /notes` to retrieve all notes
   - Try `PUT /notes/{id}` to update a note
   - Try `DELETE /notes/{id}` to delete a note

5. **Test password recovery endpoints:**
   - Try `POST /auth/forgot-password` with an email
   - Check your email for the code
   - Try `POST /auth/verify-reset-code` with the code
   - Try `POST /auth/reset-password` to change password

---

### Troubleshooting

**Backend Issues:**
- **Port 3004 already in use:** Kill the process using that port or change the PORT in `.env`
- **Database errors:** Delete the `notes.db` file and restart the backend
- **Module not found:** Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Frontend Issues:**
- **Port 3000 already in use:** Kill the process using that port
- **Compilation errors:** Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **API connection errors:** Verify the backend is running on port 3004

**Email Issues:**
- **Emails not sending:** Check Gmail credentials in `.env` file
- **Email in spam folder:** Check your spam/junk folder
- **App password not working:** Regenerate the app password in Google Account settings

---

### API Endpoints Summary

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/auth/register` | Create new user account | `{ username, email, password }` | User object + token (201) |
| POST | `/auth/login` | User login | `{ username, password }` | User object + token (200) |
| POST | `/auth/forgot-password` | Request password reset code | `{ email }` | Success message (200) |
| POST | `/auth/verify-reset-code` | Verify 6-digit code | `{ email, code }` | Verification result (200) |
| POST | `/auth/reset-password` | Reset password | `{ email, code, newPassword }` | Success message (200) |
| GET | `/notes` | Get all user notes | None | Array of notes (200) |
| POST | `/notes` | Create new note | `{ title, content }` | Note object (201) |
| GET | `/notes/:id` | Get specific note | None | Note object (200) |
| PUT | `/notes/:id` | Update note | `{ title?, content? }` | Updated note (200) |
| DELETE | `/notes/:id` | Delete note | None | Success message (200) |

---

## Project Structure

```
Activity2/
├── backend/                 # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── dto/        # Data transfer objects
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── email.service.ts
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-auth.guard.ts
│   │   ├── user/           # User module
│   │   │   ├── user.entity.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   ├── note/           # Note module
│   │   │   ├── dto/
│   │   │   ├── note.controller.ts
│   │   │   ├── note.service.ts
│   │   │   ├── note.entity.ts
│   │   │   └── note.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env                # Environment variables
│   ├── package.json
│   └── notes.db            # SQLite database (auto-generated)
│
└── frontend/               # React frontend application
    ├── src/
    │   ├── components/     # React components
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── ForgotPassword.tsx
    │   │   ├── VerifyResetCode.tsx
    │   │   ├── ResetPassword.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── NoteForm.tsx
    │   │   └── NoteItem.tsx
    │   ├── services/       # API services
    │   │   ├── authService.ts
    │   │   └── noteService.ts
    │   ├── types/          # TypeScript types
    │   │   ├── User.ts
    │   │   └── Note.ts
    │   ├── App.tsx
    │   └── index.tsx
    └── package.json
```

---

## Features Implemented

### Authentication System
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes with authentication guards

### Password Recovery System
- ✅ Email-based password reset
- ✅ 6-digit verification code generation
- ✅ Code expiration (15 minutes)
- ✅ Real Gmail SMTP integration
- ✅ Professional HTML email template
- ✅ Password strength indicator
- ✅ Real-time password match validation
- ✅ Security measures (one-time use codes)

### Note Management
- ✅ Create notes with title and content
- ✅ View all user notes
- ✅ Edit existing notes
- ✅ Delete notes with confirmation
- ✅ Real-time search functionality
- ✅ Note counter in sidebar

### User Interface
- ✅ Modern, responsive design
- ✅ Gradient color scheme
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Modal dialogs
- ✅ Hover effects and animations

### API Documentation
- ✅ Swagger/OpenAPI integration
- ✅ Interactive API testing
- ✅ Request/response examples
- ✅ Authentication support in Swagger

---

## Security Features

- **Password Hashing:** bcrypt with 10 salt rounds
- **JWT Authentication:** Secure token-based authentication
- **Email Verification:** 6-digit codes for password reset
- **Token Expiration:** Reset codes expire after 15 minutes
- **One-time Use:** Reset codes can only be used once
- **Input Validation:** class-validator for all DTOs
- **CORS Protection:** Configured for frontend origin
- **SQL Injection Prevention:** TypeORM parameterized queries

---

## Contact Information

**Developer:** Lanesra Team  
**Email:** lanesrateam@gmail.com  
**Version:** 1.0.0  
**Last Updated:** January 2024

---

## License

This project is created for educational purposes.

---

**End of Document**
