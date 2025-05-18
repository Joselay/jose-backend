# Jose Backend

A personal backend application for Jose, featuring various productivity tools starting with a school schedule management system. The application is built with NestJS, TypeScript, Prisma, PostgreSQL, and includes Swagger documentation.

## Features

### School Schedule Management

- Get current active class based on real-time
- View full schedule or filter by day
- Add, update, and delete class schedules
- Comprehensive class information (teacher, room, time)

### Future Features (Planned)

- Expense tracking
- More personal productivity tools

## Technologies

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL (with Neon cloud database)
- **ORM**: Prisma
- **Validation**: class-validator and class-transformer
- **Documentation**: Swagger
- **Testing**: Jest

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Neon cloud database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/jose-backend.git
cd jose-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string (or Neon database URL)

4. Generate Prisma client:

```bash
npm run prisma:generate
```

5. Apply database migrations:

```bash
npm run prisma:migrate
```

6. Seed the database with initial data:

```bash
npx prisma db seed
```

### Running the Application

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run build
npm run start:prod
```

### API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Database Management

- Generate Prisma client: `npm run prisma:generate`
- Run migrations: `npm run prisma:migrate`
- Deploy migrations: `npm run prisma:deploy`
- Open Prisma Studio: `npm run prisma:studio`

## Project Structure

```
src/
├── common/              # Common utilities and cross-cutting concerns
│   ├── decorators/      # Custom decorators
│   ├── filters/         # Exception filters
│   ├── guards/          # Authentication and authorization guards
│   ├── interceptors/    # Request/response interceptors
│   ├── interfaces/      # Shared interfaces
│   ├── middleware/      # HTTP middleware
│   ├── services/        # Common services (e.g., Prisma service)
│   └── pipes/           # Data transformation and validation pipes
├── config/              # Configuration settings
│   └── env/             # Environment-specific configuration
├── modules/             # Feature modules
│   ├── schedule/        # School schedule module
│   │   ├── controllers/ # Schedule controllers
│   │   ├── dto/         # Data transfer objects
│   │   ├── entities/    # Database entities
│   │   ├── services/    # Business logic services
│   │   └── schedule.module.ts # Module definition
│   └── future-features/ # Placeholder for future feature modules
├── shared/              # Shared resources across modules
│   ├── dto/             # Shared DTOs
│   ├── entities/        # Shared database entities
│   └── utils/           # Utility functions
├── app.module.ts        # Main application module
└── main.ts              # Application entry point
```

## License

This project is private and for personal use only.
