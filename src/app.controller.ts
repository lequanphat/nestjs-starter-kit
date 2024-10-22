import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Say hello' })
  getHello(): string {
    return this.appService.getHello();
  }
}
