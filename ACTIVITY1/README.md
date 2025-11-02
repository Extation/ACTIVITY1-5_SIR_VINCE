# Activity 1: To-Do List API + UI

## Description
A full-stack task manager application where users can add, view, update, and delete tasks. Built with ReactJS frontend and NestJS backend with TypeScript.

## Features
- ✅ Create new tasks with title and description
- ✅ View all tasks in a clean, organized list
- ✅ Edit existing tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Delete tasks
- ✅ Filter tasks by status (All, Active, Completed)
- ✅ Real-time task statistics
- ✅ Responsive design for mobile and desktop

## Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: SQLite with TypeORM
- **API Documentation**: Swagger UI
- **Validation**: class-validator, class-transformer
- **CORS**: Enabled for frontend integration

### Frontend
- **Framework**: ReactJS with TypeScript
- **HTTP Client**: Axios
- **Styling**: Custom CSS with responsive design
- **State Management**: React Hooks (useState, useEffect)

## Project Structure
```
activity-1-todo/
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── task/           # Task module (entity, service, controller, DTOs)
│   │   ├── app.module.ts   # Main app module with TypeORM config
│   │   └── main.ts         # App entry point with Swagger setup
│   ├── database.sqlite     # SQLite database file
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components (TaskList, TaskForm, TaskItem)
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main app component
│   └── package.json
└── docs/                   # API documentation
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd activity-1-todo/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

4. The API will be running on `http://localhost:3000`
5. Swagger documentation available at `http://localhost:3000/api`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd activity-1-todo/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The React app will be running on `http://localhost:3001`

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `PATCH /tasks/:id/toggle` - Toggle task completion status

### Request/Response Examples

#### Create Task
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Learn NestJS",
  "description": "Complete the NestJS tutorial"
}
```

#### Response
```json
{
  "id": 1,
  "title": "Learn NestJS",
  "description": "Complete the NestJS tutorial",
  "completed": false,
  "createdAt": "2025-09-26T14:30:00.000Z",
  "updatedAt": "2025-09-26T14:30:00.000Z"
}
```

## Database Schema

### Task Entity
```typescript
{
  id: number (Primary Key, Auto-increment)
  title: string (Required)
  description: string (Optional)
  completed: boolean (Default: false)
  createdAt: Date (Auto-generated)
  updatedAt: Date (Auto-generated)
}
```

## Development Notes
- The backend uses SQLite for easy setup and portability
- CORS is configured to allow requests from the React frontend
- TypeScript is used throughout for type safety
- The frontend includes error handling and loading states
- Responsive design works on mobile and desktop devices

## Testing the Application
1. Start both backend and frontend servers
2. Open `http://localhost:3001` in your browser
3. Try adding, editing, completing, and deleting tasks
4. Test the filter functionality (All, Active, Completed)
5. Check the API documentation at `http://localhost:3000/api`

## Future Enhancements
- User authentication and authorization
- Task categories and tags
- Due dates and reminders
- Task priority levels
- Search and advanced filtering
- Data export functionality
