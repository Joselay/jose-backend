# Jose Backend

A personal backend application for Jose, featuring various productivity tools starting with a schedule management system. The application is built with NestJS, TypeScript, Prisma, PostgreSQL, and includes Swagger documentation.

## Features

### Schedule Management

- Get current active class based on real-time
- View full schedule or filter by day
- Add, update, and delete schedules
- Comprehensive class information (teacher, room, time, subject)
- Fixed time slots system (5:45-6:45pm, 6:45-7:45pm, 7:45-8:45pm)
- Support for Monday through Saturday (no Sunday schedules)

### Future Features (Planned)

- Expense tracking
- More personal productivity tools

## Technologies

- **Framework**: NestJS (v11)
- **Language**: TypeScript (v5.7)
- **Database**: PostgreSQL (with Neon cloud database)
- **ORM**: Prisma (v6)
- **Validation**: class-validator and class-transformer
- **Documentation**: Swagger (NestJS Swagger v11)
- **Testing**: Jest (v29)

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or Neon cloud database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Joselay/jose-backend.git
cd jose-backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL connection string (or Neon database URL)
   - Set `PORT` to your preferred port (defaults to 3000)

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
│   ├── services/        # Common services (e.g., PrismaService)
│   └── types/           # Shared types and regex patterns
├── modules/             # Feature modules
│   ├── schedule/        # Schedule module
│   │   ├── constants/   # Constants, enums and time slots
│   │   ├── controllers/ # Schedule controllers
│   │   ├── dto/         # Data transfer objects
│   │   ├── entities/    # Database entities with business logic
│   │   ├── services/    # Business logic services
│   │   └── schedule.module.ts # Module definition
├── app.module.ts        # Main application module
└── main.ts              # Application entry point
```

## Business Rules

- Schedule system only operates Monday through Saturday (no Sunday)
- Fixed time slots for all classes:
  - First Period: 5:45pm - 6:45pm
  - Second Period: 6:45pm - 7:45pm
  - Third Period: 7:45pm - 8:45pm
- All classes are one hour in duration
- Input validation ensures only valid time slots and days are accepted

## API Endpoints

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/schedule`          | Get all schedules                |
| GET    | `/schedule/current`  | Get current active class         |
| GET    | `/schedule/day/:day` | Get schedules for a specific day |
| GET    | `/schedule/:id`      | Get a schedule by ID             |
| POST   | `/schedule`          | Create a new schedule            |
| PUT    | `/schedule/:id`      | Update a schedule                |
| DELETE | `/schedule/:id`      | Delete a schedule                |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
