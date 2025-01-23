# Aguns CRM

This project is a fullstack application divided into two main parts:

- **Backend**: Built with `Express.js` for handling API requests, authentication, and database operations.
- **Frontend**: Planned to be built with `Next.js` for a modern and responsive user interface (not implemented yet).

---

## Project Structure

```
root
├── server                 # Backend (Express.js)
│   ├── src
│   │   ├── config         # Configuration files
│   │   ├── errors         # Custom error handlers
│   │   ├── lib            # Utility libraries (JWT, database, etc.)
│   │   ├── middleware     # Middlewares (e.g., authentication)
│   │   ├── prisma         # Database schema and client
│   │   ├── routes         # API routes
│   │   ├── services       # Business logic services
│   │   ├── types          # TypeScript types and interfaces
│   │   └── server.ts      # Main entry point
│   ├── Dockerfile         # Backend Docker configuration
│   ├── package.json       # Backend dependencies
│   └── tsconfig.json      # TypeScript configuration
├── web                    # Frontend (Next.js - not yet implemented)
│   └── (Planned Structure)
├── .env                   # Environment variables
└── README.md              # Project documentation
```

---

## Backend (Express.js)

The backend is built with `Express.js` and includes the following features:

- **Authentication**: Uses JWT for user authentication and Google OAuth for social login.
- **Database**: Managed using Prisma with a MySQL database.
- **API Structure**:
  - `/api/auth`: Handles authentication (login, registration, Google OAuth).
  - `/api/admin`: Admin functionalities.
  - `/api/crm`: CRM-related operations.
  - `/api/base`: General APIs, including project management.
  - `/api/crm/tasks`: Task management.
  - `/api/crm/records`: Record management.

### Technologies Used

- **Node.js**: Server-side runtime.
- **Express.js**: Framework for routing and middleware.
- **Prisma**: Database ORM.
- **TypeScript**: For type-safe development.
- **Docker**: To containerize the backend.
- **Swagger**: API documentation (integrated with `swagger.json`).

### How to Run the Backend

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Set up `.env` file (refer to `.env.example` for structure).

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build and run the production server:
   ```bash
   npm run build
   npm start
   ```

5. Run using Docker:
   ```bash
   docker build -t backend .
   docker run -p 3000:3000 backend
   ```

---

## Frontend (Next.js)

The frontend will be developed using `Next.js` and will serve as the main user interface for interacting with the backend APIs.

### Planned Features:

- **Responsive Design**: Built with Tailwind CSS.
- **Authentication**: Integration with backend APIs for login and registration.
- **CRM Dashboard**: A visual interface for managing tasks, records, and projects.

---

## Contributing

We welcome contributions to this project! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add my new feature"
   ```
4. Push your changes:
   ```bash
   git push origin feature/my-feature
   ```
5. Open a pull request.

---

## Contributors

- **[Guimaraes Mahota]** - _Project Lead_
- **[Contributor Name]** - _Role/Feature_

---

## License

This project is licensed under the [MIT License](LICENSE).
