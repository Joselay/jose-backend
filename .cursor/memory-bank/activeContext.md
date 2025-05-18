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

   - Created Teacher module with complete CRUD operations
   - Added avatar functionality with support for both direct URLs and file uploads
   - Integrated Cloudinary for cloud-based image storage
   - Implemented file upload functionality with fallback to local storage

4. Improved error handling and type safety:

   - Enhanced error handling in service methods with proper logging
   - Improved type safety throughout the application
   - Added validation using class-validator decorators

## Recent Changes

1. **Architecture Improvements**:

   - Adopted Repository Pattern to isolate database operations
   - Implemented Mapper Pattern for entity transformations
   - Separated concerns in the service layer for better maintainability
   - Created specialized services with clear responsibilities

2. **Database Schema Improvements**:

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
