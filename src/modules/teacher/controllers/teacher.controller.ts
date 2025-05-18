import { CreateTeacherDto, UpdateTeacherDto } from '@modules/teacher/dto';
import { TeacherService } from '@modules/teacher/services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({
    status: 200,
    description: 'Return all teachers',
  })
  async getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiResponse({
    status: 200,
    description: 'Return a specific teacher',
  })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  async getTeacherById(@Param('id') id: string) {
    return this.teacherService.getTeacherById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiBody({ type: CreateTeacherDto })
  @ApiResponse({
    status: 201,
    description: 'The teacher has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiBody({ type: UpdateTeacherDto })
  @ApiResponse({
    status: 200,
    description: 'The teacher has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  async updateTeacher(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.updateTeacher(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiResponse({
    status: 200,
    description: 'The teacher has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  async deleteTeacher(@Param('id') id: string) {
    return this.teacherService.deleteTeacher(id);
  }

  @Put(':id/avatar')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a teacher avatar' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          example: 'https://example.com/avatars/teacher.jpg',
          description: 'URL or path to the teacher avatar image',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The teacher avatar has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  async updateTeacherAvatar(
    @Param('id') id: string,
    @Body('avatar') avatar: string,
  ) {
    return this.teacherService.updateTeacherAvatar(id, avatar);
  }
}
