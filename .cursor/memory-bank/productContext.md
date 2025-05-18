# Product Context: Jose Backend

## Why This Project Exists

Jose Backend was created to solve the problem of having to search through phone gallery images to find class schedules. Instead of scrolling through screenshots or photos of schedule information, this application provides a structured API to store and access schedule data efficiently.

## Problems It Solves

1. **Inefficient Schedule Lookup**: Replaces the need to search through gallery images for schedule information
2. **Poor Organization**: Provides a structured way to store and retrieve schedule data
3. **Limited Accessibility**: Makes schedule information accessible through API endpoints
4. **Real-time Awareness**: Provides the ability to quickly determine the current active class

## How It Should Work

1. User can add schedule entries with details like teacher name, room, day of week, time range, and subject
2. The system stores this information in a PostgreSQL database using Prisma ORM
3. User can retrieve full schedule or filter by day of week
4. The system can determine which class is currently active based on the day and time
5. User can update or delete schedule entries as needed
6. All API endpoints are documented with Swagger for easy reference

## User Experience Goals

1. **Simplicity**: Easy-to-understand API endpoints with clear documentation
2. **Reliability**: Consistent and accurate schedule information
3. **Flexibility**: Support for various query options (by day, current class, etc.)
4. **Extensibility**: Ability to add more features in the future
5. **Validation**: Proper input validation to ensure data integrity
