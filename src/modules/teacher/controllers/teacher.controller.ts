import { UploadService } from '@common/services';
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
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('teachers')
@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly uploadService: UploadService,
  ) {}

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
  @ApiOperation({
    summary: 'Update a teacher',
    description:
      'Update teacher details including name. To set or update the avatar, use the dedicated avatar upload endpoint.',
  })
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

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload a teacher avatar image',
    description:
      'Upload an image file to be used as the teacher avatar. The file will be uploaded to Cloudinary cloud storage, and the resulting URL will update the teacher record.',
  })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description:
            'Teacher avatar image file (will be stored in Cloudinary)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'The teacher avatar has been successfully uploaded to Cloudinary.',
  })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid file or Cloudinary not configured.',
  })
  async uploadTeacherAvatar(
    @Param('id') id: string,
    @UploadedFile() file: any,
  ) {
    if (!file) {
      return { error: 'No file uploaded' };
    }

    const avatarUrl = await this.uploadService.uploadFile(file);
    return this.teacherService.updateTeacherAvatar(id, avatarUrl);
  }
}
