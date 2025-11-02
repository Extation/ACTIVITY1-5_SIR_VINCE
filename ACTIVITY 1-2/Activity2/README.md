# Activity 2: Notes API + UI

A personal notes application with user authentication built with React (frontend) and NestJS (backend).

## Features

### Backend (NestJS + TypeScript)
- **User Authentication**: JWT-based authentication system
- **User Registration & Login**: Secure user account creation and login
- **Notes CRUD Operations**: Create, read, update, and delete personal notes
- **Private Notes**: Each user can only access their own notes
- **API Documentation**: Swagger UI available at `/api`
- **Database**: SQLite with TypeORM
- **Security**: Password hashing with bcrypt, JWT tokens

### Frontend (React + TypeScript)
- **Authentication UI**: Login and registration forms
- **Notes Dashboard**: View all personal notes in a grid layout
- **Note Management**: Add, edit, and delete notes with modal forms
- **Search Functionality**: Search notes by title or content
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Immediate UI updates after operations

## Tech Stack

- **Frontend**: React 18, TypeScript, React Router, Axios
- **Backend**: NestJS, TypeScript, TypeORM, SQLite
- **Authentication**: JWT, Passport, bcrypt
- **Documentation**: Swagger/OpenAPI
- **Styling**: CSS3 with modern design

## Project Structure

```
activity-2-notes/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── user/           # User management
│   │   ├── note/           # Notes CRUD operations
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Application entry point
│   ├── package.json
│   └── database.sqlite     # SQLite database (auto-created)
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main app component
│   └── package.json
└── docs/                   # API documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd activity-2-notes/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend server will start on `http://localhost:3002`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd activity-2-notes/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend application will start on `http://localhost:3001`

## API Documentation

Once the backend is running, you can access the Swagger API documentation at:
- **Swagger UI**: http://localhost:3002/api

### API Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

#### Notes (Protected Routes)
- `GET /notes` - Get all user's notes
- `GET /notes/:id` - Get specific note
- `POST /notes` - Create new note
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## Usage

1. **Start both servers** (backend on :3002, frontend on :3001)
2. **Register a new account** or login with existing credentials
3. **Create notes** using the "Add Note" button
4. **Edit notes** by clicking the edit icon on any note
5. **Delete notes** by clicking the delete icon
6. **Search notes** using the search bar
7. **Logout** using the logout button in the header

## Database Schema

### Users Table
- `id` (Primary Key)
- `username` (Unique)
- `email` (Unique)
- `password` (Hashed)
- `createdAt`
- `updatedAt`

### Notes Table
- `id` (Primary Key)
- `title`
- `content`
- `userId` (Foreign Key)
- `createdAt`
- `updatedAt`

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: API endpoints require valid JWT tokens
- **User Isolation**: Users can only access their own notes
- **Input Validation**: Request validation using class-validator

## Development

### Backend Development
```bash
cd activity-2-notes/backend
npm run start:dev    # Start with hot reload
npm run build        # Build for production
npm run test         # Run tests
```

### Frontend Development
```bash
cd activity-2-notes/frontend
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests
```

## Environment Variables

The application uses default configurations, but you can customize:

### Backend (.env)
```
PORT=3002
JWT_SECRET=your-secret-key
DATABASE_PATH=./database.sqlite
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3002
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3001 and 3002 are available
2. **CORS errors**: Backend includes CORS configuration for frontend
3. **Database issues**: SQLite database is created automatically
4. **Authentication errors**: Check JWT token expiration and validity

### Reset Database
To reset the database, simply delete the `database.sqlite` file and restart the backend.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes as part of the Activity 1-2 assignment.
