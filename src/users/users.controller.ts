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

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/orders')
  findOrdersHistory(@Param('id') userId: string) {
    return this.usersService.findOrdersHistory(+userId);
  }
}
