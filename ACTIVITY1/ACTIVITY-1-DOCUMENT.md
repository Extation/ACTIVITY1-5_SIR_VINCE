# ACTIVITY 1: To-Do List Application

---

## Title of Activity
**To-Do List - Full-Stack Task Management Web Application**

---

## Description

The To-Do List Application is a full-stack web application that enables users to efficiently manage their daily tasks. Built with modern web technologies, it provides a clean and intuitive interface for creating, organizing, and tracking tasks with real-time statistics and filtering capabilities.

**Key Features:**
- **Task Management:** Complete CRUD operations (Create, Read, Update, Delete)
- **Status Tracking:** Toggle tasks between completed and active states
- **Smart Filtering:** View all tasks, only active tasks, or completed tasks
- **Real-time Statistics:** Live counters showing total, active, and completed tasks
- **Responsive Design:** Seamless experience across desktop and mobile devices
- **Modern UI:** Gradient backgrounds, smooth animations, and intuitive interface
- **Confirmation Modals:** Safe deletion with confirmation dialogs
- **API Documentation:** Interactive Swagger UI for API exploration and testing

**Technology Stack:**
- **Frontend:** React 18 + TypeScript + Axios
- **Backend:** NestJS + TypeScript + TypeORM
- **Database:** SQLite (lightweight, file-based)
- **Validation:** class-validator for DTO validation
- **API Docs:** Swagger/OpenAPI

---

## Screenshots of Working System

### User Interface Screenshots

#### 1. Main Dashboard - Empty State
![Dashboard Empty](screenshots/dashboard-empty.png)
*Clean welcome screen when no tasks exist, encouraging users to create their first task*

#### 2. Main Dashboard with Tasks
![Dashboard with Tasks](screenshots/dashboard-with-tasks.png)
*Task list showing multiple tasks with completion status, edit, and delete options*

#### 3. Task Statistics Panel
![Task Statistics](screenshots/task-statistics.png)
*Real-time counters displaying:*
- *Total Tasks: All tasks in the system*
- *Active Tasks: Incomplete tasks*
- *Completed Tasks: Finished tasks*

#### 4. Create New Task Form
![Create Task](screenshots/create-task.png)
*Modal form for creating new tasks with:*
- *Title field (required, max 200 characters)*
- *Description field (optional, max 1000 characters)*
- *Character counters for both fields*
- *Create and Cancel buttons*

#### 5. Edit Task Form
![Edit Task](screenshots/edit-task.png)
*Edit existing task with pre-filled data:*
- *Same validation as create form*
- *Update and Cancel buttons*
- *Character counters showing remaining characters*

#### 6. Task Completion Toggle
![Toggle Complete](screenshots/toggle-complete.png)
*Click checkbox to mark task as complete/incomplete:*
- *Completed tasks show with strikethrough text*
- *Green checkmark for completed status*
- *Instant visual feedback*

#### 7. Delete Confirmation Modal
![Delete Confirmation](screenshots/delete-confirmation.png)
*Safety confirmation before deleting tasks:*
- *"Are you sure you want to delete this task?"*
- *Task title displayed for verification*
- *Confirm and Cancel buttons*

#### 8. Filter Options
![Filter Tasks](screenshots/filter-tasks.png)
*Three filter buttons:*
- *All: Show all tasks*
- *Active: Show only incomplete tasks*
- *Completed: Show only finished tasks*

#### 9. Responsive Mobile View
![Mobile View](screenshots/mobile-view.png)
*Fully responsive design adapting to mobile screens*

#### 10. Loading State
![Loading State](screenshots/loading-state.png)
*Loading spinner while fetching tasks from the API*

---

### API Examples (Swagger UI)

#### 11. Swagger API Documentation
![Swagger UI](screenshots/swagger-main.png)
*Interactive API documentation at http://localhost:3000/api*

#### 12. POST /tasks - Create New Task
![API Create Task](screenshots/api-create-task.png)
```json
Request:
{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the to-do list application"
}

Response (201 Created):
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the to-do list application",
  "completed": false,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### 13. GET /tasks - Get All Tasks
![API Get All Tasks](screenshots/api-get-all-tasks.png)
```json
Response (200 OK):
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the to-do list application",
    "completed": false,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Review code",
    "description": "Review and refactor the task service",
    "completed": true,
    "createdAt": "2024-01-15T09:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
]
```

#### 14. GET /tasks/:id - Get Single Task
![API Get Task](screenshots/api-get-task.png)
```json
Response (200 OK):
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the to-do list application",
  "completed": false,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### 15. PATCH /tasks/:id - Update Task
![API Update Task](screenshots/api-update-task.png)
```json
Request:
{
  "title": "Complete project documentation (Updated)",
  "description": "Write comprehensive documentation including screenshots",
  "completed": false
}

Response (200 OK):
{
  "id": 1,
  "title": "Complete project documentation (Updated)",
  "description": "Write comprehensive documentation including screenshots",
  "completed": false,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

#### 16. PATCH /tasks/:id/toggle - Toggle Completion Status
![API Toggle Complete](screenshots/api-toggle-complete.png)
```json
Response (200 OK):
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the to-do list application",
  "completed": true,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T13:00:00.000Z"
}
```

#### 17. DELETE /tasks/:id - Delete Task
![API Delete Task](screenshots/api-delete-task.png)
```json
Response (204 No Content):
// No response body - task successfully deleted
```

#### 18. Error Response - Task Not Found
![API Error](screenshots/api-error-404.png)
```json
Response (404 Not Found):
{
  "statusCode": 404,
  "message": "Task with ID 999 not found",
  "error": "Not Found"
}
```

#### 19. Error Response - Validation Error
![API Validation Error](screenshots/api-validation-error.png)
```json
Request:
{
  "title": "",
  "description": "This will fail because title is empty"
}

Response (400 Bad Request):
{
  "statusCode": 400,
  "message": [
    "title should not be empty",
    "title must be longer than or equal to 1 characters"
  ],
  "error": "Bad Request"
}
```

#### 20. Swagger Schema Definitions
![API Schemas](screenshots/api-schemas.png)
*View all data models and their properties in Swagger UI*

---

## Instructions on How to Run the Project

### Prerequisites
Before running the project, ensure you have the following installed:
- **Node.js** version 16 or higher
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

---

### Step 1: Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Activity1/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - NestJS framework
   - TypeORM and SQLite
   - Swagger documentation tools
   - Validation libraries

3. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

   **Expected Output:**
   ```
   [Nest] LOG [NestFactory] Starting Nest application...
   [Nest] LOG [InstanceLoader] AppModule dependencies initialized
   [Nest] LOG [InstanceLoader] TypeOrmModule dependencies initialized
   [Nest] LOG [InstanceLoader] TaskModule dependencies initialized
   [Nest] LOG [RoutesResolver] TaskController {/tasks}:
   [Nest] LOG [RouterExplorer] Mapped {/tasks, POST} route
   [Nest] LOG [RouterExplorer] Mapped {/tasks, GET} route
   [Nest] LOG [RouterExplorer] Mapped {/tasks/:id, GET} route
   [Nest] LOG [RouterExplorer] Mapped {/tasks/:id, PATCH} route
   [Nest] LOG [RouterExplorer] Mapped {/tasks/:id, DELETE} route
   [Nest] LOG [RouterExplorer] Mapped {/tasks/:id/toggle, PATCH} route
   [Nest] LOG [NestApplication] Nest application successfully started
   ```

   ✅ **Backend is now running at:** `http://localhost:3000`
   
   ✅ **Swagger API documentation at:** `http://localhost:3000/api`

   **Note:** The SQLite database file (`todo.db`) will be automatically created in the backend directory on first run.

---

### Step 2: Frontend Setup

1. **Open a new terminal window** (keep the backend running)

2. **Navigate to the frontend directory:**
   ```bash
   cd Activity1/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - React and React DOM
   - TypeScript
   - Axios for API calls
   - Testing libraries

4. **Start the frontend application:**
   ```bash
   npm start
   ```

   **Expected Output:**
   ```
   Compiled successfully!
   
   You can now view the app in the browser.
   
   Local:            http://localhost:3001
   On Your Network:  http://192.168.x.x:3001
   
   Note that the development build is not optimized.
   To create a production build, use npm run build.
   ```

   ✅ **Frontend is now running at:** `http://localhost:3001`

   The application will automatically open in your default browser.

---

### Step 3: Test the Application

#### Testing the User Interface:

1. **Open your browser** and navigate to `http://localhost:3001`

2. **Create your first task:**
   - Click the "+ Create Task" button
   - Enter a task title (e.g., "Buy groceries")
   - Optionally add a description (e.g., "Milk, bread, eggs")
   - Click "CREATE TASK"
   - Your task will appear in the list

3. **Mark a task as complete:**
   - Click the checkbox next to any task
   - The task text will show a strikethrough
   - The "Completed Tasks" counter will increase

4. **Edit a task:**
   - Click the "Edit" button (pencil icon) on any task
   - Modify the title or description
   - Click "UPDATE TASK"
   - Changes will be reflected immediately

5. **Delete a task:**
   - Click the "Delete" button (trash icon) on any task
   - A confirmation modal will appear
   - Click "CONFIRM" to delete or "CANCEL" to keep the task

6. **Filter tasks:**
   - Click "All" to see all tasks
   - Click "Active" to see only incomplete tasks
   - Click "Completed" to see only finished tasks

7. **View statistics:**
   - Check the statistics panel showing:
     - Total Tasks
     - Active Tasks
     - Completed Tasks

#### Testing the API with Swagger:

1. **Open Swagger UI** in your browser: `http://localhost:3000/api`

2. **Test creating a task:**
   - Expand `POST /tasks`
   - Click "Try it out"
   - Enter task data in the request body:
     ```json
     {
       "title": "Test task from Swagger",
       "description": "Testing the API"
     }
     ```
   - Click "Execute"
   - Check the response (should be 201 Created)

3. **Test getting all tasks:**
   - Expand `GET /tasks`
   - Click "Try it out"
   - Click "Execute"
   - View all tasks in the response

4. **Test updating a task:**
   - Expand `PATCH /tasks/{id}`
   - Click "Try it out"
   - Enter a task ID (e.g., 1)
   - Modify the request body
   - Click "Execute"

5. **Test toggling completion:**
   - Expand `PATCH /tasks/{id}/toggle`
   - Click "Try it out"
   - Enter a task ID
   - Click "Execute"
   - The task's completed status will toggle

6. **Test deleting a task:**
   - Expand `DELETE /tasks/{id}`
   - Click "Try it out"
   - Enter a task ID
   - Click "Execute"
   - Response should be 204 No Content

---

### Troubleshooting

**Backend Issues:**

- **Port 3000 already in use:**
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:3000 | xargs kill -9
  ```

- **Database errors:**
  - Delete the `todo.db` file in the backend directory
  - Restart the backend server
  - The database will be recreated automatically

- **Module not found errors:**
  ```bash
  # Delete node_modules and reinstall
  rm -rf node_modules package-lock.json
  npm install
  ```

**Frontend Issues:**

- **Port 3001 already in use:**
  - The app will prompt you to use a different port
  - Press 'Y' to accept
  - Or kill the process using port 3001

- **Cannot connect to backend:**
  - Verify the backend is running on port 3000
  - Check the console for CORS errors
  - Ensure `http://localhost:3001` is in the backend CORS configuration

- **Compilation errors:**
  ```bash
  # Clear cache and reinstall
  rm -rf node_modules package-lock.json
  npm install
  ```

**Common Issues:**

- **Tasks not loading:**
  - Check browser console for errors (F12)
  - Verify backend is running and accessible
  - Check network tab for failed API requests

- **Changes not saving:**
  - Check backend console for validation errors
  - Ensure task title is not empty
  - Verify character limits are not exceeded

---

### API Endpoints Summary

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/tasks` | Create new task | `{ title, description? }` | Task object (201) |
| GET | `/tasks` | Get all tasks | None | Array of tasks (200) |
| GET | `/tasks/:id` | Get specific task | None | Task object (200) |
| PATCH | `/tasks/:id` | Update task | `{ title?, description?, completed? }` | Updated task (200) |
| DELETE | `/tasks/:id` | Delete task | None | No content (204) |
| PATCH | `/tasks/:id/toggle` | Toggle completion | None | Updated task (200) |

**Validation Rules:**
- **Title:** Required, 1-200 characters
- **Description:** Optional, max 1000 characters
- **Completed:** Boolean (true/false)

---

## Project Structure

```
Activity1/
├── backend/                          # NestJS backend application
│   ├── src/
│   │   ├── task/                     # Task module
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   │   ├── create-task.dto.ts    # Task creation validation
│   │   │   │   └── update-task.dto.ts    # Task update validation
│   │   │   ├── task.controller.ts    # HTTP endpoints & Swagger docs
│   │   │   ├── task.entity.ts        # Database entity definition
│   │   │   ├── task.module.ts        # Module configuration
│   │   │   └── task.service.ts       # Business logic
│   │   ├── app.module.ts             # Root module with TypeORM config
│   │   ├── app.controller.ts         # Root controller
│   │   ├── app.service.ts            # Root service
│   │   └── main.ts                   # Application entry point
│   ├── test/                         # E2E tests
│   ├── todo.db                       # SQLite database (auto-generated)
│   ├── package.json                  # Dependencies
│   ├── tsconfig.json                 # TypeScript configuration
│   └── nest-cli.json                 # NestJS CLI configuration
│
└── frontend/                         # React frontend application
    ├── public/
    │   ├── index.html                # HTML template
    │   ├── favicon.ico               # App icon
    │   └── manifest.json             # PWA manifest
    ├── src/
    │   ├── components/               # React components
    │   │   ├── TaskList.tsx          # Main container component
    │   │   ├── TaskForm.tsx          # Create/edit form
    │   │   ├── TaskItem.tsx          # Individual task display
    │   │   ├── ConfirmModal.tsx      # Delete confirmation
    │   │   └── TypingTitle.tsx       # Animated title
    │   ├── services/                 # API services
    │   │   └── taskService.ts        # Axios API client
    │   ├── types/                    # TypeScript interfaces
    │   │   └── Task.ts               # Task type definitions
    │   ├── App.tsx                   # Root component
    │   ├── index.tsx                 # Application entry
    │   └── setupTests.js             # Test configuration
    ├── package.json                  # Dependencies
    └── tsconfig.json                 # TypeScript configuration
```

---

## Features Implemented

### Task Management
- ✅ Create tasks with title and optional description
- ✅ View all tasks in a clean, organized list
- ✅ Edit existing tasks with pre-filled data
- ✅ Delete tasks with confirmation modal
- ✅ Toggle task completion status with checkbox
- ✅ Real-time task statistics (Total, Active, Completed)

### Filtering & Organization
- ✅ Filter by All tasks
- ✅ Filter by Active (incomplete) tasks
- ✅ Filter by Completed tasks
- ✅ Tasks ordered by creation date (newest first)

### User Interface
- ✅ Modern gradient design
- ✅ Responsive layout (mobile & desktop)
- ✅ Smooth animations and transitions
- ✅ Loading states with spinner
- ✅ Success and error messages
- ✅ Character counters on forms
- ✅ Form validation with error display
- ✅ Hover effects on interactive elements

### API Features
- ✅ RESTful API design
- ✅ Swagger/OpenAPI documentation
- ✅ Input validation with class-validator
- ✅ Proper HTTP status codes
- ✅ Error handling and messages
- ✅ CORS configuration for frontend

### Data Persistence
- ✅ SQLite database for data storage
- ✅ TypeORM for database operations
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ Data validation at database level

---

## Technical Implementation Details

### Backend Architecture

**NestJS Framework:**
- Modular architecture with dependency injection
- Decorator-based routing and validation
- Built-in support for TypeScript
- Middleware and interceptor support

**Database Layer:**
- TypeORM for object-relational mapping
- SQLite for lightweight data storage
- Entity-based data modeling
- Automatic schema synchronization

**Validation:**
- class-validator decorators on DTOs
- Automatic validation pipe
- Custom error messages
- Whitelist filtering for security

**API Documentation:**
- Swagger UI for interactive testing
- OpenAPI specification
- Automatic schema generation
- Request/response examples

### Frontend Architecture

**React Components:**
- Functional components with hooks
- TypeScript for type safety
- Component composition pattern
- Separation of concerns

**State Management:**
- useState for local state
- useEffect for side effects
- Prop drilling for data flow
- Callback functions for events

**API Integration:**
- Axios for HTTP requests
- Centralized API service
- Error handling and retry logic
- Loading state management

**Styling:**
- Inline styles with TypeScript
- Responsive design patterns
- CSS-in-JS approach
- Modern UI/UX principles

---

## Database Schema

### Task Entity

```typescript
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;                    // Auto-incrementing primary key

  @Column()
  title: string;                 // Task title (required)

  @Column({ nullable: true })
  description: string;           // Task description (optional)

  @Column({ default: false })
  completed: boolean;            // Completion status (default: false)

  @CreateDateColumn()
  createdAt: Date;              // Auto-generated creation timestamp

  @UpdateDateColumn()
  updatedAt: Date;              // Auto-updated modification timestamp
}
```

**Field Descriptions:**
- **id:** Unique identifier, automatically generated
- **title:** Task name, required, max 200 characters
- **description:** Additional details, optional, max 1000 characters
- **completed:** Boolean flag for task status
- **createdAt:** Timestamp when task was created
- **updatedAt:** Timestamp when task was last modified

---

## Security Features

- **Input Validation:** All inputs validated using class-validator
- **SQL Injection Prevention:** TypeORM parameterized queries
- **CORS Protection:** Configured for specific frontend origins
- **Type Safety:** TypeScript throughout the application
- **Error Handling:** Proper error messages without exposing internals
- **Whitelist Filtering:** Unknown properties stripped from requests

---

## Performance Optimizations

- **Database Indexing:** Primary key indexing on task ID
- **Efficient Queries:** TypeORM optimized queries
- **React Optimization:** Functional components with hooks
- **Lazy Loading:** Components loaded as needed
- **Minimal Re-renders:** Proper state management
- **Lightweight Database:** SQLite for fast operations

---

## Future Enhancements

### Planned Features
- 🔄 User authentication and authorization
- 🔄 Task categories and tags
- 🔄 Due dates and reminders
- 🔄 Task priority levels (High, Medium, Low)
- 🔄 Search functionality
- 🔄 Sorting options (by date, priority, status)
- 🔄 Task notes and attachments
- 🔄 Recurring tasks
- 🔄 Task sharing and collaboration
- 🔄 Data export (JSON, CSV)
- 🔄 Dark mode theme
- 🔄 Drag-and-drop task reordering
- 🔄 Task history and audit log
- 🔄 Email notifications
- 🔄 Mobile app version

### Technical Improvements
- 🔄 PostgreSQL for production
- 🔄 Redis for caching
- 🔄 WebSocket for real-time updates
- 🔄 Unit and integration tests
- 🔄 CI/CD pipeline
- 🔄 Docker containerization
- 🔄 API rate limiting
- 🔄 Logging and monitoring
- 🔄 Performance metrics

---

## Development Notes

### Best Practices Followed
- **Clean Code:** Readable and maintainable code structure
- **Type Safety:** Full TypeScript implementation
- **Error Handling:** Comprehensive error management
- **Documentation:** Inline comments and API docs
- **Validation:** Input validation at all levels
- **Separation of Concerns:** Clear module boundaries
- **RESTful Design:** Standard HTTP methods and status codes
- **Responsive Design:** Mobile-first approach

### Code Quality
- **ESLint:** Code linting for consistency
- **Prettier:** Code formatting
- **TypeScript:** Static type checking
- **Modular Structure:** Organized file structure
- **Reusable Components:** DRY principle

---

## Testing Guide

### Manual Testing Checklist

**Task Creation:**
- [ ] Create task with title only
- [ ] Create task with title and description
- [ ] Try to create task without title (should fail)
- [ ] Create task with maximum character limits
- [ ] Verify task appears in the list

**Task Reading:**
- [ ] View all tasks
- [ ] Verify task details are correct
- [ ] Check timestamps are displayed
- [ ] Test with empty task list

**Task Updating:**
- [ ] Edit task title
- [ ] Edit task description
- [ ] Update both title and description
- [ ] Cancel edit operation
- [ ] Verify changes are saved

**Task Deletion:**
- [ ] Delete a task
- [ ] Cancel deletion
- [ ] Delete multiple tasks
- [ ] Verify task is removed from list

**Task Completion:**
- [ ] Mark task as complete
- [ ] Mark task as incomplete
- [ ] Verify visual feedback (strikethrough)
- [ ] Check statistics update

**Filtering:**
- [ ] Filter by All
- [ ] Filter by Active
- [ ] Filter by Completed
- [ ] Verify correct tasks are shown

**Error Handling:**
- [ ] Test with backend offline
- [ ] Test with invalid data
- [ ] Verify error messages display
- [ ] Test retry functionality

---

## Contact Information

**Project:** Activity 1 - To-Do List Application  
**Version:** 1.0.0  
**Last Updated:** January 2024  
**Framework:** NestJS + React + TypeScript

---

## License

This project is created for educational purposes as part of a web development course.

---

**End of Document**
