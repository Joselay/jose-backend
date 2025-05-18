import { AppService } from '@modules/app/app.service';
import { Controller, Get, Header } from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Get API information' })
  @ApiOkResponse({ description: 'Returns information about the API' })
  getApiInfo() {
    return this.appService.getApiInfo();
  }
}
