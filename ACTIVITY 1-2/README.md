# ACTIVITY 1-2: Full-Stack Applications with React + NestJS

This repository contains two complete full-stack applications built with React.js frontend and NestJS backend, demonstrating modern web development practices with TypeScript, authentication, and database integration.

## 📋 Project Overview

### Activity 1: To-Do List API + UI
A task management application with full CRUD operations for managing tasks.

### Activity 2: Notes API + UI with Authentication
A personal notes application with user registration, authentication, and private note management.

## 🏗️ Architecture

Both applications follow a clean, modular architecture:

- **Frontend**: React.js 18 with TypeScript
- **Backend**: NestJS with TypeScript
- **Database**: SQLite with TypeORM
- **Authentication**: JWT tokens (Activity 2)
- **API Documentation**: Swagger/OpenAPI
- **Styling**: Custom CSS with responsive design

## 📁 Project Structure

```
ACTIVITY 1-2/
├── activity-1-todo/
│   ├── backend/           # NestJS API (Port 30001)
│   ├── frontend/          # React App (Port 3000)
│   ├── docs/              # API documentation
│   ├── Activity1-Document.docx
│   └── README.md
├── activity-2-notes/
│   ├── backend/           # NestJS API with Auth (Port 3004)
│   ├── frontend/          # React App (Port 3003)
│   ├── docs/              # API documentation
│   ├── Activity2-Document.docx
│   └── README.md
├── TODO.md               # Project progress tracker
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Running Activity 1 (To-Do List)

1. **Start Backend**:
   ```bash
   cd activity-1-todo/backend
   npm install
   npm run start:dev
   ```
   Backend runs on: http://localhost:30001
   Swagger docs: http://localhost:30001/api

2. **Start Frontend**:
   ```bash
   cd activity-1-todo/frontend
   npm install
   npm start
   ```
   Frontend runs on: http://localhost:3000

### Running Activity 2 (Notes App)

1. **Start Backend**:
   ```bash
   cd activity-2-notes/backend
   npm install
   npm run start:dev
   ```
   Backend runs on: http://localhost:3004
   Swagger docs: http://localhost:3004/api

2. **Start Frontend**:
   ```bash
   cd activity-2-notes/frontend
   npm install
   npm start
   ```
   Frontend runs on: http://localhost:3003

## 🔧 Port Configuration

| Application | Component | Port | URL |
|-------------|-----------|------|-----|
| Activity 1 | Frontend | 3000 | http://localhost:3000 |
| Activity 1 | Backend | 30001 | http://localhost:30001 |
| Activity 2 | Frontend | 3003 | http://localhost:3003 |
| Activity 2 | Backend | 3004 | http://localhost:3004 |

## 📚 Features Comparison

| Feature | Activity 1 (To-Do) | Activity 2 (Notes) |
|---------|--------------------|--------------------|
| User Authentication | ❌ | ✅ JWT-based |
| CRUD Operations | ✅ Tasks | ✅ Notes |
| Database | SQLite | SQLite |
| API Documentation | ✅ Swagger | ✅ Swagger + Auth |
| Responsive UI | ✅ | ✅ |
| TypeScript | ✅ | ✅ |
| Data Validation | ✅ | ✅ |
| Error Handling | ✅ | ✅ |

## 🛠️ Technology Stack

### Frontend
- **React.js 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Axios**: HTTP client for API calls
- **CSS3**: Custom styling with flexbox/grid
- **React Router**: Client-side routing (Activity 2)

### Backend
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe server-side development
- **TypeORM**: Object-relational mapping
- **SQLite**: Lightweight database
- **Passport.js**: Authentication middleware (Activity 2)
- **JWT**: JSON Web Tokens for auth (Activity 2)
- **Swagger**: API documentation
- **bcrypt**: Password hashing (Activity 2)

## 📖 API Documentation

Both applications include comprehensive Swagger documentation:

- **Activity 1**: http://localhost:30001/api
- **Activity 2**: http://localhost:3004/api (includes JWT authentication)

## 🔐 Security Features (Activity 2)

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- User data isolation
- Automatic token expiration handling
- CORS configuration

## 🗄️ Database Schema

### Activity 1 (Tasks)
```sql
Tasks Table:
- id (Primary Key)
- title (String, Required)
- description (String, Optional)
- completed (Boolean, Default: false)
- createdAt (DateTime)
- updatedAt (DateTime)
```

### Activity 2 (Users & Notes)
```sql
Users Table:
- id (Primary Key)
- username (String, Unique)
- email (String, Unique)
- password (String, Hashed)
- createdAt (DateTime)
- updatedAt (DateTime)

Notes Table:
- id (Primary Key)
- title (String, Required)
- content (Text, Required)
- userId (Foreign Key)
- createdAt (DateTime)
- updatedAt (DateTime)
```

## 🧪 Testing the Applications

### Activity 1 Testing
1. Open http://localhost:3000
2. Add new tasks using the form
3. Mark tasks as completed
4. Edit existing tasks
5. Delete tasks
6. Filter tasks by status

### Activity 2 Testing
1. Open http://localhost:3003
2. Register a new user account
3. Login with your credentials
4. Create, edit, and delete notes
5. Logout and login again to verify persistence

## 📝 Development Notes

- Both applications use SQLite for easy setup and portability
- Database files are created automatically on first run
- CORS is configured for frontend-backend communication
- TypeScript provides compile-time type checking
- Error handling includes user-friendly messages
- Responsive design works on mobile and desktop

## 🚀 Deployment Considerations

For production deployment:

1. **Environment Variables**: Configure database URLs, JWT secrets, etc.
2. **Database**: Consider PostgreSQL or MySQL for production
3. **Security**: Enable HTTPS, secure JWT secrets
4. **Performance**: Add caching, optimize queries
5. **Monitoring**: Add logging and error tracking

## 📄 Documentation

Detailed documentation for each activity:
- [Activity 1 Documentation](./activity-1-todo/Activity1-Document.docx)
- [Activity 2 Documentation](./activity-2-notes/Activity2-Document.docx)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues:
1. Check the individual README files in each activity folder
2. Review the API documentation via Swagger
3. Check the browser console for frontend errors
4. Review backend logs for API issues

## 🎯 Learning Objectives Achieved

- ✅ Full-stack application development
- ✅ RESTful API design and implementation
- ✅ Database design and ORM usage
- ✅ User authentication and authorization
- ✅ Frontend-backend integration
- ✅ TypeScript development
- ✅ API documentation with Swagger
- ✅ Modern React development patterns
- ✅ Error handling and validation
- ✅ Responsive web design


