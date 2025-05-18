# Active Context: Jose Backend

## Current Work Focus

The main focus has been implementing the schedule management feature with specific business rules:

1. Implemented schedule feature with specific time slots and day constraints:

   - Schedule only available Monday through Saturday (no Sunday)
   - Fixed time slots: 5:45-6:45pm, 6:45-7:45pm, and 7:45-8:45pm
   - Enforced validation for these constraints in DTOs and entities

2. Enhanced the codebase organization following NestJS best practices:

   - Improved code organization with proper separation of concerns
   - Created constants directory for enums and other shared values
   - Added common types directory for shared regex patterns
   - Added business logic methods to the Schedule entity

3. Fixed issues with Prisma client and improved error handling:

   - Changed Prisma client import from custom path to default path
   - Enhanced error handling in service methods with proper logging
   - Improved type safety throughout the application

## Recent Changes

1. **Code Organization Improvements**:

   - Extracted Day enum to a separate file in constants directory
   - Created time-slots.constant.ts for standard time slot definitions
   - Added common regex patterns in a shared types directory
   - Updated imports to use barrel exports for cleaner code

2. **Enhanced Validation**:

   - Updated DTOs to use Day enum for proper validation
   - Added custom validators for time slots
   - Replaced hardcoded regex patterns with shared constants
   - Added proper descriptions and enums to Swagger documentation

3. **Business Logic Enhancements**:
   - Added methods to work with time slots in the Schedule entity
   - Enhanced isInSession() to properly handle days of the week
   - Added getTimeSlot() and getPeriodLabel() utility methods
   - Updated seed data to use the standard time slots

## Next Steps

1. **Testing**:

   - Test the API endpoints with the new validation rules
   - Verify that time slot constraints work correctly
   - Check that day filtering works correctly without Sunday

2. **Documentation**:

   - Ensure Swagger documentation reflects the available time slots
   - Document the day constraints in the API documentation
   - Add examples showing the expected time format

3. **Feature Enhancements**:
   - Consider adding more advanced filtering options
   - Implement pagination for schedule listings
   - Add statistics about schedule usage

## Active Decisions and Considerations

1. **Schedule Constraints**:

   - Limited to Monday-Saturday only (no Sunday schedules)
   - Fixed time slots for consistency and ease of scheduling
   - Standard one-hour length for all classes

2. **Port Configuration**:

   - Using port 3001 by default to avoid conflicts with other common services
   - Updated .env file to ensure consistent port usage

3. **Code Organization**:

   - Constants like Day enum and TIME_SLOTS are in separate files for reuse
   - Common regex patterns stored in shared location
   - Proper separation between entities, DTOs, and business logic

4. **API Design**:

   - Following RESTful conventions for endpoints
   - Using enhanced DTOs with strong validation
   - Providing clear error messages for validation failures

This document will be frequently updated as work progresses on the school schedule feature and as additional features are planned.
