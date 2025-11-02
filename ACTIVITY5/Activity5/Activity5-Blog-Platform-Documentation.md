# Activity 5: Blog Platform API + UI

## Project Overview

**Title:** Full-Stack Blog Platform with NestJS and ReactJS

**Description:** A comprehensive blog platform featuring role-based authentication, post management with image uploads, categorization, like system, search functionality, and interactive comment system. Built with modern web technologies including NestJS for the backend API, ReactJS for the frontend UI, and SQLite for data persistence.

## Features Implemented

### Backend (NestJS + TypeScript)
- ✅ **User Authentication**: JWT-based authentication with registration and login
- ✅ **Role-Based Access Control (RBAC)**: Admin and User roles with permission guards
- ✅ **Password Security**: Bcrypt hashing for secure password storage
- ✅ **Database Integration**: SQLite database with TypeORM
- ✅ **CRUD Operations**: Complete Create, Read, Update, Delete for users, posts, and comments
- ✅ **Image Upload**: Multer integration for post image uploads with validation
- ✅ **File Validation**: Image format (JPG, PNG, GIF) and size (5MB) validation
- ✅ **Post Categories**: 10 predefined categories for content organization
- ✅ **Like System**: Like/Unlike functionality for posts
- ✅ **API Documentation**: Swagger/OpenAPI documentation
- ✅ **Input Validation**: Class-validator for request validation
- ✅ **Pagination**: Implemented for posts listing
- ✅ **CORS Support**: Cross-origin resource sharing enabled
- ✅ **Static File Serving**: Uploaded images served from uploads directory

### Frontend (ReactJS)
- ✅ **Modern UI Design**: Clean, responsive design with custom CSS and Bootstrap
- ✅ **Featured Posts Carousel**: Auto-rotating showcase of top 3 posts
- ✅ **Search Functionality**: Real-time search across posts, categories, and authors
- ✅ **Authentication Flow**: Login and registration forms with role detection
- ✅ **Post Management**: Create, view, edit, and delete blog posts (admin only)
- ✅ **Image Upload**: Drag-and-drop image upload with preview
- ✅ **Post Categories**: Category selection and filtering
- ✅ **Like System**: Interactive like/unlike buttons for posts
- ✅ **Comment System**: Add, view, and delete comments on posts
- ✅ **Protected Routes**: Role-based navigation and access control
- ✅ **State Management**: React Context for authentication state
- ✅ **API Integration**: Axios for HTTP requests with interceptors
- ✅ **Responsive Grid Layout**: Modern card-based post display
- ✅ **Reading Time Calculation**: Estimated reading time for each post
- ✅ **Empty States**: User-friendly messages for no content scenarios

## Technology Stack

### Backend
- **Framework**: NestJS 10.x
- **Language**: TypeScript
- **Database**: SQLite with TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-Based Access Control (Admin/User)
- **File Upload**: Multer for multipart/form-data
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Security**: bcrypt for password hashing, JWT guards, Admin guards

### Frontend
- **Framework**: ReactJS 18.x
- **Language**: JavaScript (ES6+)
- **Routing**: React Router DOM
- **HTTP Client**: Axios with interceptors
- **Styling**: Custom CSS + Bootstrap 5
- **State Management**: React Context API
- **UI Features**: Image preview, auto-carousel, real-time search

## Project Structure

```
Activity5/
├── backend-nestjs/          # NestJS Backend API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── guards/     # JWT and Admin guards
│   │   │   ├── strategies/ # JWT strategy
│   │   │   └── dto/        # Login/Register DTOs
│   │   ├── users/          # Users CRUD module
│   │   │   ├── entities/   # User entity with role field
│   │   │   └── dto/        # User DTOs
│   │   ├── posts/          # Posts CRUD module
│   │   │   ├── entities/   # Post entity with image, category, likes
│   │   │   └── dto/        # Post DTOs
│   │   ├── comments/       # Comments CRUD module
│   │   │   ├── entities/   # Comment entity
│   │   │   └── dto/        # Comment DTOs
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   ├── uploads/            # Uploaded images directory
│   ├── blog.db             # SQLite database file
│   └── package.json        # Backend dependencies
├── frontend/               # ReactJS Frontend
│   ├── public/             # Static assets
│   │   └── background.jpg  # Background image
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   └── Navigation.js # Navigation bar with role-based menu
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js     # Homepage with featured posts & search
│   │   │   ├── CreatePost.js # Post creation (admin only)
│   │   │   ├── EditPost.js # Post editing (admin only)
│   │   │   ├── PostDetail.js # Post detail with comments
│   │   │   ├── Login.js    # Login page
│   │   │   ├── Register.js # Registration page
│   │   │   └── Profile.js  # User profile page
│   │   ├── services/       # API service functions
│   │   │   └── api.js      # Axios configuration & API calls
│   │   ├── contexts/       # React Context providers
│   │   │   └── AuthContext.js # Authentication & role management
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Custom styling
│   │   └── index.js        # Application entry point
│   └── package.json        # Frontend dependencies
├── package.json            # Root package with concurrent scripts
├── start-blog-platform.bat # Windows batch file to start both servers
└── Activity5-Blog-Platform-Documentation.md # This documentation
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration (creates user with 'user' role by default)
- `POST /auth/login` - User login (returns JWT token and user data with role)

### Posts
- `GET /posts` - Get all posts with pagination
  - Query params: `page` (default: 1), `limit` (default: 10)
  - Returns: Posts with author info, images, categories, likes
- `GET /posts/:id` - Get specific post with full details
- `POST /posts` - Create new post with image upload (**Admin only**)
  - Content-Type: `multipart/form-data`
  - Fields: `title`, `content`, `category`, `image` (file)
  - Requires: JWT token + Admin role
- `PATCH /posts/:id` - Update post with optional image upload (**Admin only**)
  - Content-Type: `multipart/form-data`
  - Requires: JWT token + Admin role
- `DELETE /posts/:id` - Delete post (**Admin only**)
  - Requires: JWT token + Admin role
- `POST /posts/:id/like` - Like/Unlike a post (authenticated)
  - Toggles like status for the user
  - Requires: JWT token

### Comments
- `GET /comments/post/:postId` - Get all comments for a specific post
- `POST /comments` - Create new comment (authenticated)
  - Body: `{ content, postId }`
  - Requires: JWT token
- `PATCH /comments/:id` - Update comment (authenticated, own comments only)
  - Requires: JWT token
- `DELETE /comments/:id` - Delete comment (authenticated, own comments only)
  - Requires: JWT token

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get specific user
- `PATCH /users/:id` - Update user (authenticated)
  - Requires: JWT token

### Static Files
- `GET /uploads/:filename` - Access uploaded images
  - Example: `http://localhost:3001/uploads/image-1234567890.jpg`

### Health Check
- `GET /health` - API health check endpoint

## How to Run the Project

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start (Recommended)

#### Option 1: Using the Batch File (Windows)
1. Double-click `start-blog-platform.bat` in the root directory
2. Both backend and frontend will start automatically

#### Option 2: Using npm Scripts (All Platforms)
1. From the root directory:
   ```bash
   npm install
   npm run start:dev
   ```
2. This will start both backend and frontend concurrently

### Manual Setup

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend-nestjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start:dev
   ```

4. The backend API will be available at: `http://localhost:3001`
5. Swagger documentation will be available at: `http://localhost:3001/api/docs`
6. Uploads directory will be created automatically

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The frontend application will be available at: `http://localhost:3000`

### Testing the Application

#### 1. User Registration & Login
- Create a new user account (first user can be set as admin in database)
- Sign in with your credentials
- JWT token will be stored in localStorage

#### 2. Admin Features (Admin Role Required)
- **Create Posts**: 
  - Click "Create Post" in navigation
  - Fill in title, content, select category
  - Upload an image (optional, max 5MB)
  - Preview image before publishing
  - Click "Publish Post"
- **Edit Posts**: 
  - Click edit icon on your posts
  - Modify content and/or replace image
  - Save changes
- **Delete Posts**: 
  - Click delete option in post menu
  - Confirm deletion

#### 3. User Features (All Authenticated Users)
- **Browse Posts**: 
  - View featured posts carousel (auto-rotates every 5 seconds)
  - Scroll through posts grid
  - Use pagination for more posts
- **Search Posts**: 
  - Use search bar in navigation
  - Search by title, content, category, or author
  - View filtered results
- **Like Posts**: 
  - Click like button on any post
  - Toggle to unlike
- **Comment on Posts**: 
  - Open post detail page
  - Add comments in the comment section
  - Delete your own comments

#### 4. Guest Features (Unauthenticated)
- View all posts
- Read post details
- View comments
- Search posts

## Successfully Tested Features

### ✅ User Authentication & Authorization
- User registration with validation
- User login with JWT token generation
- Role-based access control (Admin/User roles)
- Protected routes and authentication state management
- Admin-only post creation, editing, and deletion

### ✅ Post Management
- Create new blog posts with title, content, category, and image (Admin only)
- Edit existing posts with image replacement (Admin only)
- Delete posts (Admin only)
- View all posts with pagination
- Featured posts carousel (auto-rotating top 3 posts)
- Post categories (10 options: Business Travel, Technology, Lifestyle, etc.)
- Display post metadata (author, date, reading time, comment count)
- Responsive grid layout for post display

### ✅ Image Upload System
- Image upload with drag-and-drop support
- Image preview before upload
- File validation (JPG, PNG, GIF formats only)
- Size limit enforcement (5MB maximum)
- Secure file storage in uploads directory
- Image display in posts and featured carousel

### ✅ Search & Discovery
- Real-time search functionality
- Search across post titles, content, categories, and authors
- Search results counter
- Clear search option
- Empty state handling for no results

### ✅ Comment System
- Add comments to posts (authenticated users)
- View all comments with author and timestamp
- Delete own comments
- Comment count display
- Empty state for posts without comments

### ✅ Database Integration
- SQLite database with TypeORM
- Automatic table creation and migrations
- Data persistence across server restarts
- Relational data (users, posts, comments)
- Role field in user entity

### ✅ API Documentation
- Comprehensive Swagger documentation
- Interactive API testing interface
- Detailed endpoint descriptions
- Authentication setup in Swagger UI

### ✅ Full-Stack Integration
- Seamless frontend-backend communication
- Proper error handling and user feedback
- Responsive UI design with modern aesthetics
- Role-based UI rendering
- Image upload and display integration

## User Roles & Permissions

### Admin Role
- Create new blog posts
- Edit any post
- Delete any post
- Upload images for posts
- Add and delete comments
- Full access to all features

### User Role
- View all post
- Add comments
- Delete own comments
- Cannot create, edit, or delete posts

**Note**: The first registered user or users with role='admin' in the database have admin privileges.

## API Documentation

The complete API documentation is available via Swagger UI at:
`http://localhost:3001/api/docs`

This interactive documentation includes:
- All available endpoints
- Request/response schemas
- Authentication requirements (JWT Bearer token)
- Role-based access indicators
- File upload specifications
- Example requests and responses
- Try-it-out functionality

## Key Features Showcase

### 1. Homepage with Featured Posts
- **Featured Carousel**: Auto-rotating showcase of top 3 posts with images
- **Search Bar**: Real-time search across all post content
- **Posts Grid**: Modern card-based layout with images and metadata
- **Category Badges**: Visual category indicators
- **Reading Time**: Estimated reading time for each post
- **Pagination**: Navigate through multiple pages of posts
- **Empty States**: User-friendly messages when no posts exist

### 2. Post Creation (Admin Only)
- **Category Selection**: Choose from 10 predefined categories
- **Rich Text Input**: Title and content fields with character counters
- **Image Upload**: 
  - Drag-and-drop or click to upload
  - Image preview before publishing
  - Format validation (JPG, PNG, GIF)
  - Size limit (5MB)
  - Remove image option
- **Writing Tips**: Helpful suggestions for creating engaging posts
- **Validation**: Real-time form validation

### 3. Post Detail Page
- **Full Post Display**: Complete post with formatted content
- **Featured Image**: Large hero image display
- **Post Metadata**: Author, date, reading time, comment count
- **Edit/Delete Options**: For post authors (admin)
- **Comments Section**: 
  - Add new comments (authenticated users)
  - View all comments with timestamps
  - Delete own comments
  - Empty state for no comments

### 4. User Authentication
- **Login Form**: Email/password authentication
- **Registration Form**: Username, email, password with validation
- **Role Detection**: Automatic role identification (admin/user)
- **JWT Token Management**: Secure token storage
- **Protected Routes**: Role-based access control
- **Navigation Updates**: Dynamic menu based on authentication state

### 5. Search & Discovery
- **Real-Time Search**: Instant results as you type
- **Multi-Field Search**: Searches titles, content, categories, authors
- **Results Counter**: Shows number of matching posts
- **Clear Search**: Easy reset to view all posts
- **No Results State**: Helpful message when no matches found

### 6. Admin Dashboard Features
- **Create Post Button**: Prominent in navigation (admin only)
- **Edit Post**: Inline edit buttons on own posts
- **Delete Post**: Confirmation dialog before deletion
- **Image Management**: Upload and replace post images
- **Category Management**: Assign and change post categories

### 7. API Documentation (Swagger)
- **Interactive Documentation**: Test endpoints directly
- **Authentication Setup**: JWT Bearer token configuration
- **Request/Response Examples**: Clear API usage examples
- **Schema Definitions**: Detailed data models
- **Role Requirements**: Clearly marked admin-only endpoints

## Technical Highlights

### Backend Architecture
- **Modular Design**: Separate modules for auth, users, posts, comments
- **Guard System**: JWT authentication guard + Admin authorization guard
- **File Upload Pipeline**: Multer middleware with custom storage and validation
- **Entity Relationships**: TypeORM relations between users, posts, and comments
- **DTO Validation**: Class-validator decorators for input validation
- **Swagger Integration**: Automatic API documentation generation

### Frontend Architecture
- **Component-Based**: Reusable components and page-level components
- **Context API**: Centralized authentication and user state management
- **Custom Hooks**: useAuth hook for accessing authentication context
- **Axios Interceptors**: Automatic JWT token injection in requests
- **Responsive Design**: Mobile-first approach with Bootstrap and custom CSS
- **Image Handling**: Preview, validation, and upload functionality
- **Real-Time Features**: Auto-rotating carousel, live search

### Security Features
- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Admin guard for protected endpoints
- **File Validation**: Type and size checks for uploads
- **CORS Configuration**: Controlled cross-origin access
- **Input Sanitization**: DTO validation on all inputs

## Future Enhancement Possibilities

- **Rich Text Editor**: Markdown or WYSIWYG editor for post content
- **User Profiles**: Detailed user pages with bio and avatar
- **Post Tags**: Additional tagging system beyond categories
- **Advanced Search**: Filters by date, category, author
- **Notifications**: Real-time notifications for comments and likes
- **Social Sharing**: Share posts on social media platforms
- **Draft System**: Save posts as drafts before publishing
- **Post Analytics**: View counts, engagement metrics
- **Comment Replies**: Nested comment threads
- **User Following**: Follow favorite authors
- **Email Notifications**: Email alerts for new comments
- **Image Gallery**: Multiple images per post
- **Video Embeds**: Support for video content
- **SEO Optimization**: Meta tags and structured data

## Conclusion

This Blog Platform successfully demonstrates a complete, production-ready full-stack web application with:

✅ **Modern Backend API**: NestJS with TypeScript, featuring role-based access control, file uploads, and comprehensive validation

✅ **Interactive Frontend**: ReactJS with modern UI/UX, including featured posts carousel, real-time search, and responsive design

✅ **Secure Authentication**: JWT-based authentication with role management (Admin/User)

✅ **Rich Feature Set**: Image uploads, post categories, like system, comment management, and search functionality

✅ **Database Integration**: SQLite with TypeORM for reliable data persistence and relationships

✅ **Comprehensive Documentation**: Swagger/OpenAPI for interactive API testing

✅ **Professional UI/UX**: Modern, responsive interface with empty states, loading indicators, and user feedback

✅ **Role-Based Permissions**: Admin-only post management with user-level interactions

The application demonstrates best practices in full-stack development, including modular architecture, security considerations, user experience design, and scalable code structure. It serves as an excellent foundation for a production blog platform and can be easily extended with additional features.
