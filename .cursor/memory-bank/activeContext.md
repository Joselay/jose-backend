# Active Context: Jose Backend

## Current Work Focus

The main focus has been implementing and refining core features:

1. Implemented schedule feature with specific time slots and day constraints:

   - Schedule only available Monday through Saturday (no Sunday)
   - Fixed time slots: 5:45-6:45pm, 6:45-7:45pm, and 7:45-8:45pm
   - Enforced validation for these constraints in DTOs and entities

2. Enhanced the codebase architecture following NestJS best practices:

   - Implemented Repository Pattern with ScheduleRepositoryService
   - Implemented Mapper Pattern with ScheduleMapperService
   - Refactored ScheduleService to focus purely on business logic
   - Normalized database schema with separate models (Teacher, Room, Subject, TimeSlot, Schedule)

3. Implemented teacher management with avatar support:

   - Created TeacherController for CRUD operations
   - Added TeacherService and TeacherRepositoryService
   - Implemented avatar support using Cloudinary exclusively for storage
   - Set up file upload functionality for avatars
   - Enhanced data validation for teacher data

4. Improved API configuration and documentation:

   - Standardized on port 3000 for all environments
   - Added Swagger documentation with basic authentication
   - Made Cloudinary mandatory for file storage
   - Removed fallback to local storage
   - Added proper error handling for missing Cloudinary credentials

## Recent Changes

- Port standardized to 3000 across the codebase
- Consolidated avatar update endpoints to a single endpoint
- Updated file upload system to use Cloudinary exclusively
- Removed local file storage and static file serving
- Added authentication for Swagger documentation
- Enhanced error handling for file upload operations
- Updated documentation to reflect the changes

## Next Steps

1. Add more validation to file uploads (size and type validation)
2. Implement pagination for schedule listings to handle larger datasets
3. Add sorting options for schedule endpoints
4. Add filtering by teacher name and subject
5. Write unit tests for the existing services and repositories

## Active Decisions and Considerations

- **File Storage**: Decided to use Cloudinary exclusively for all file storage to ensure consistent behavior across environments and simplify the codebase.
- **API Documentation Security**: Added basic authentication to protect Swagger documentation from unauthorized access.
- **Error Handling**: Enhanced error handling to provide clear messages when Cloudinary credentials are missing.
- **Port Standardization**: Standardized on port 3000 across the codebase for consistency.
- **API Schema**: Continuously refining API schema to ensure clear and consistent endpoints.
- **Code Organization**: Maintaining separation of concerns with distinct modules and services.
- **Environment Configuration**: Using environment variables for all configurable values.
  - Normalized database schema with appropriate relationships
  - Established one-to-many relationships for teachers, rooms, and subjects
  - Created proper constraints to prevent scheduling conflicts
  - Removed Sunday from Day enum as per business rules
  - Added avatar field to Teacher model

3. **Avatar Functionality**:

   - Added Cloudinary integration for cloud-based image storage
   - Created UploadService for handling file uploads
   - Implemented fallback to local storage when Cloudinary is not configured
   - Consolidated teacher avatar management endpoints for better API design
   - Added proper error handling and logging for file uploads

4. **Code Organization Enhancements**:
   - Updated imports to use barrel exports for cleaner code
   - Improved error handling and validation
   - Enhanced entity methods for time-based calculations
   - Added utility methods for working with schedules
   - Standardized port configuration to 3000 throughout the application

## Next Steps

1. **Testing**:

   - Write unit tests for new service architecture
   - Test repository and mapper services independently
   - Verify that time slot constraints work correctly
   - Ensure Day enum validation properly excludes Sunday
   - Test avatar upload functionality with both local and Cloudinary storage

2. **Documentation**:

   - Update Swagger documentation to reflect architectural changes
   - Document database schema relationships
   - Add examples showing proper data formats
   - Document avatar upload functionality and supported file types

3. **Feature Enhancements**:
   - Implement pagination for schedule listings
   - Add more advanced filtering options
   - Consider adding statistics about schedule usage
   - Enhance teacher search and filtering capabilities
   - Add batch operations for teachers and schedules

## Active Decisions and Considerations

1. **Architectural Patterns**:

   - Using Repository Pattern to abstract database operations
   - Using Mapper Pattern for entity transformations
   - Keeping services focused on specific responsibilities
   - Adhering to separation of concerns principles

2. **Schedule Constraints**:

   - Limited to Monday-Saturday only (no Sunday schedules)
   - Fixed time slots for consistency and ease of scheduling
   - Standard one-hour length for all classes

3. **Database Design**:

   - Normalized structure with proper relationships
   - Unique constraints to prevent scheduling conflicts
   - Separate models for different entities (Teacher, Room, Subject, TimeSlot)
   - Teacher model now includes avatar field for profile images

4. **API Design**:

   - Following RESTful conventions for endpoints
   - Using enhanced DTOs with strong validation
   - Providing clear error messages for validation failures
   - Simplified avatar management endpoints for better usability

5. **File Storage Strategy**:
   - Primary: Cloudinary for cloud-based image storage
   - Fallback: Local file system when Cloudinary is not configured
   - Dynamic URL generation based on storage location
   - Secure and optimized upload configuration

This document will be frequently updated as work progresses on the application features.
