# System Patterns: Jose Backend

## Architecture

The application follows the NestJS modular architecture pattern, which emphasizes:

- Clear separation of concerns
- Modular design with feature-based modules
- Dependency injection for loose coupling
- Layer separation (controllers, services, entities, DTOs, constants)

## Key Technical Decisions

### Business Rules

- Schedule only available Monday through Saturday (no Sunday)
- Fixed time slots: 5:45-6:45pm, 6:45-7:45pm, and 7:45-8:45pm
- One hour duration for all classes
- Fixed set of valid time slots for consistency
- Teachers can have profile avatars stored in Cloudinary or locally

### Database Schema

- PostgreSQL database hosted on Neon
- Using Prisma ORM for type-safe database operations
- The core models are the `Schedule` and `Teacher` entities
- Time-based data stored as strings in "HH:MM" format for simplicity
- Normalized database structure with separate tables for teachers, rooms, subjects, and time slots
- Avatar URLs stored in the Teacher model

### File Storage

- Dual storage strategy with Cloudinary (primary) and local storage (fallback)
- Environment-based decision for storage location
- Automatic fallback to local storage when Cloudinary is not configured
- Cloud storage for production environments
- Local storage for development and testing
- URL generation based on storage location

### API Design

- RESTful API endpoints following standard conventions
- Proper input validation using class-validator decorators
- Swagger documentation using NestJS Swagger integration
- Standard CRUD operations for schedule and teacher entries
- Special endpoints for filtering by day and finding current active class
- File upload endpoints for teacher avatars
- Multipart/form-data support for file uploads

### Validation

- Input validation using class-validator
- Data transformation using class-transformer
- Custom validators for time slots
- Enum-based validation for days of the week
- Shared regex patterns for common validations

### Exception Handling

- Using NestJS built-in exception filters
- Proper HTTP status codes for different error scenarios
- Custom error messages for better client understanding
- Logging with NestJS Logger service

## Design Patterns in Use

### Repository Pattern

- ScheduleRepositoryService and TeacherRepositoryService abstract database operations
- Handles all direct interactions with the Prisma client
- Focuses on data access concerns only
- Provides specialized methods for database operations
- Encapsulates database-specific logic and queries

### Mapper Pattern

- ScheduleMapperService handles entity transformation
- Maps between Prisma models and domain entities
- Contains utility methods for type conversions (e.g., Day enum mapping)
- Centralizes mapping logic to avoid duplication
- Provides consistent entity conversion throughout the application

### Service Layer Pattern

- Services implement business logic (ScheduleService, TeacherService, UploadService)
- Uses repository for data access
- Uses mapper for entity transformations
- Focuses on orchestration and error handling
- Keeps business rules separate from data access and presentation

### Strategy Pattern

- UploadService implements different storage strategies
- Dynamically selects between Cloudinary and local storage
- Encapsulates the complexity of each storage method
- Provides a unified interface for file uploads
- Allows for easy switching between strategies

### Factory Method Pattern

- Entity classes implement factory methods (fromPrisma, fromPrismaArray)
- Centralizes entity creation logic
- Ensures consistent entity initialization
- Abstracts away entity mapping complexities
- Used across the application for entity creation

### Dependency Injection

- NestJS's built-in DI container for managing dependencies
- Services injected into controllers
- Repository and Mapper services injected into main service
- PrismaService injected into repository service
- UploadService injected where file handling is needed

### DTO Pattern

- Separate DTOs for input validation and data transfer
- CreateScheduleDto and CreateTeacherDto for creating new entries with validation
- UpdateScheduleDto and UpdateTeacherDto for updates
- Uses class-validator for input validation

### Entity Pattern

- Entities represent domain models (Schedule, Teacher)
- Contains business logic methods
- Implements factory methods for data transformation
- Encapsulates domain-specific behavior

### Constants Pattern

- Enums and constant values extracted to dedicated files
- TIME_SLOTS constant defines available time slots
- Day enum defines available days of the week
- Shared regex patterns in common types directory

## Component Relationships

```mermaid
graph TD
    A[AppModule] --> B[ScheduleModule]
    A --> T[TeacherModule]

    B --> C[ScheduleController]
    B --> D[ScheduleService]
    B --> M[ScheduleMapperService]
    B --> N[ScheduleRepositoryService]

    T --> TC[TeacherController]
    T --> TS[TeacherService]
    T --> TR[TeacherRepositoryService]
    T --> US[UploadService]

    C --> D
    D --> M
    D --> N

    TC --> TS
    TC --> US
    TS --> TR

    N --> E[PrismaService]
    TR --> E
    E --> F[PostgreSQL Database]

    C --> G[CreateScheduleDto]
    C --> H[UpdateScheduleDto]

    TC --> TCD[CreateTeacherDto]
    TC --> TUD[UpdateTeacherDto]

    D --> I[Schedule Entity]
    TS --> TE[Teacher Entity]

    M --> I
    G --> J[Constants]
    I --> J
    J --> K[Day Enum]
    J --> L[TIME_SLOTS]
    G --> O[Common Types]
    O --> P[Regex Patterns]

    US --> CL[Cloudinary]
    US --> LS[Local Storage]
```

## File Organization

- `/src/modules/schedule/controllers`: Contains schedule API controllers
- `/src/modules/schedule/services`: Contains schedule business logic, repository, and mapper services
- `/src/modules/schedule/dto`: Contains schedule data transfer objects for validation
- `/src/modules/schedule/entities`: Contains schedule entity definitions
- `/src/modules/schedule/constants`: Contains schedule-related enums and constant values
- `/src/modules/teacher/controllers`: Contains teacher API controllers
- `/src/modules/teacher/services`: Contains teacher business logic and repository services
- `/src/modules/teacher/dto`: Contains teacher data transfer objects for validation
- `/src/modules/teacher/entities`: Contains teacher entity definitions
- `/src/common/services`: Contains shared services like PrismaService and UploadService
- `/src/common/types`: Contains shared types and regex patterns
- `/src/common/config`: Contains configuration files like CloudinaryConfig
- `/prisma`: Contains database schema and migrations
- `/uploads`: Contains locally stored uploaded files
