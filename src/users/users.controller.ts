import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/orders')
  @ApiOperation({
    summary: 'Get user orders history',
  })
  findOrdersHistory(@Param('id') userId: string) {
    return this.usersService.findOrdersHistory(+userId);
  }
}
