import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from '@prisma/client';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() orderDetials: { userId: number }) {
    return this.ordersService.create(orderDetials);
  }

  @Get(':id')
  findOne(@Param('id') orderId: string) {
    return this.ordersService.findOne(+orderId);
  }

  @Put(':id/status')
  update(
    @Param('id') orderId: string,
    @Body() { status }: { status: OrderStatus },
  ) {
    return this.ordersService.update(+orderId, status);
  }

  @Post('apply-coupon')
  applyCoupon(
    @Body() { orderId, couponCode }: { orderId: number; couponCode: string },
  ) {
    return this.ordersService.applyCoupon(orderId, couponCode);
  }
}
