# Technical Context: Jose Backend

## Technologies Used

### Backend Framework

- **NestJS**: Main backend framework providing dependency injection, modular architecture
- **TypeScript**: For type-safe code development
- **Node.js**: Runtime environment

### Database

- **PostgreSQL**: Main database (hosted on Neon)
- **Prisma ORM**: For database access and migrations
- **Database Models**: Teacher, Room, Subject, TimeSlot, Schedule

### API Documentation

- **Swagger/OpenAPI**: For API documentation via NestJS Swagger module

### Validation

- **class-validator**: For DTO validation
- **class-transformer**: For transforming plain objects to class instances

### Code Quality

- **ESLint**: For code linting
- **Prettier**: For code formatting
- **Jest**: For unit testing

## Development Setup

### Environment Variables

- **DATABASE_URL**: Connection string for Neon PostgreSQL
- **PORT**: (Optional) Port for the application to run on (defaults to 3001)

### Local Development Commands

- `npm run start:dev`: Start the development server with hot-reload
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Create and apply migrations
- `npm run prisma:studio`: Open Prisma Studio for database browsing
- `npm run prisma:deploy`: Deploy migrations to production

### Project Structure

```
jose-backend/
├── prisma/                     # Prisma schema and migrations
│   ├── migrations/             # Database migrations
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed script
├── src/
│   ├── common/                 # Common utilities, services, etc.
│   │   ├── services/           # Shared services
│   │   │   └── prisma.service.ts  # Prisma service for DI
│   │   └── types/              # Shared types and interfaces
│   ├── modules/                # Feature modules
│   │   ├── app/                # App module (root)
│   │   │   ├── app.controller.ts  # Root controller
│   │   │   ├── app.module.ts      # Main module
│   │   │   └── app.service.ts     # App service
│   │   └── schedule/           # Schedule module
│   │       ├── constants/      # Constants and enums
│   │       ├── controllers/    # HTTP controllers
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── entities/       # Domain entities
│   │       ├── services/       # Business logic services
│   │       │   ├── schedule.service.ts         # Business logic
│   │       │   ├── schedule-mapper.service.ts  # Entity mapping
│   │       │   └── schedule-repository.service.ts  # Data access
│   │       └── schedule.module.ts  # Module definition
│   └── main.ts                 # Application entry point
├── .env                        # Environment variables
└── package.json                # Dependencies and scripts
```

## Technical Constraints

### Database

- Using Neon PostgreSQL for cloud database hosting
- Database schema changes require migrations
- Normalized data structure with relationships between entities

### API Design

- Following RESTful principles for API design
- Using Swagger for API documentation
- Using class-validator for input validation

### Code Style

- Following TypeScript best practices
- Using ESLint and Prettier for code quality
- Following NestJS architecture patterns

### Architectural Patterns

- Repository Pattern for data access
- Mapper Pattern for entity transformations
- Service Layer Pattern for business logic
- DTO Pattern for input validation
- Entity Pattern for domain models

## Dependencies

### Production Dependencies

- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`: NestJS framework
- `@nestjs/config`: Configuration management
- `@nestjs/swagger`: API documentation
- `@prisma/client`: Prisma ORM client
- `class-validator`, `class-transformer`: Validation and transformation
- `reflect-metadata`: Required for NestJS decorators

### Development Dependencies

- `prisma`: Prisma CLI for migrations
- `@nestjs/cli`: NestJS command line tools
- TypeScript and related tools
- Testing libraries (Jest)
