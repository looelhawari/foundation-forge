# CPC Qatar Admin Backend

Node.js + Express + MySQL backend for CPC Qatar construction company website admin panel.

## Prerequisites

- Node.js 18+
- MySQL 8.0+

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your MySQL credentials:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=cpc_qatar
   ```

3. **Create MySQL database:**

   ```sql
   CREATE DATABASE cpc_qatar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Start the server:**

   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

   The server will:
   - Initialize the database tables automatically
   - Create a default admin user if none exists
   - Start listening on port 3001

## Default Admin Credentials

- **Email:** admin@cpcqatar.com
- **Password:** Admin@123456

⚠️ **Change the default password immediately after first login!**

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin profile
- `PUT /api/auth/profile` - Update admin profile
- `PUT /api/auth/password` - Change password
- `POST /api/auth/logout` - Logout

### Projects

- `GET /api/projects` - List projects (with filtering, pagination)
- `GET /api/projects/:id` - Get project by ID/slug
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)
- `GET /api/projects/categories` - Get categories
- `GET /api/projects/stats` - Get project statistics

### Contact

- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - List submissions (auth required)
- `PATCH /api/contact/:id/status` - Update status (auth required)
- `DELETE /api/contact/:id` - Delete submission (auth required)

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics (auth required)
- `GET /api/dashboard/activity` - Get activity logs (auth required)
- `GET /api/dashboard/settings` - Get site settings (auth required)
- `PUT /api/dashboard/settings` - Update settings (auth required)

## Security Features

- JWT authentication with 24h token expiration
- Password hashing with bcrypt (10 rounds)
- Rate limiting (100 requests per 15 minutes)
- Helmet.js security headers
- Input validation with express-validator
- SQL injection prevention with parameterized queries
- XSS protection
- CORS configuration

## Project Structure

```
backend-node/
├── src/
│   ├── index.js            # Entry point
│   ├── config/
│   │   ├── index.js        # Configuration
│   │   ├── database.js     # MySQL connection pool
│   │   └── initDatabase.js # Database initialization
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── contactController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   ├── errorHandler.js # Global error handler
│   │   ├── rateLimiter.js  # Rate limiting
│   │   └── activityLogger.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── contactRoutes.js
│   │   └── dashboardRoutes.js
│   └── utils/
│       ├── logger.js       # Winston logger
│       ├── helpers.js      # Utility functions
│       └── validators.js   # Validation rules
├── logs/                   # Log files (auto-created)
├── .env                    # Environment variables
├── .env.example            # Environment template
└── package.json
```

## Development

```bash
# Start with auto-reload
npm run dev

# Check for issues
npm run lint

# Format code
npm run format
```

## License

Private - CPC Qatar
