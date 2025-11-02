## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the React App**
   ```bash
   npm start
   ```
   
   The app will open at: http://localhost:3001

3. **Make Sure API is Running**
   - The backend API must be running on http://localhost:3000
   - Start it with: `cd bookshelf-api && npm run start:dev`

## Features

- **Authors Tab**: Create, Read, Update, Delete authors
- **Categories Tab**: Create, Read, Update, Delete categories  
- **Books Tab**: Create, Read, Update, Delete books

## How It Works

- React connects to your NestJS API endpoints
- Uses simple `fetch()` to call the API
- Basic forms for Create and Update
- Buttons for Edit and Delete operations

## Note

If you get CORS errors, add `app.enableCors();` in `bookshelf-api/src/main.ts`
