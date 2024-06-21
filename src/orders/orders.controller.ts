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
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new order from items in user's cart",
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
      },
    },
  })
  create(@Body() orderDetials: { userId: number }) {
    return this.ordersService.create(orderDetials);
  }

  @Get(':id')
  @ApiOperation({
    summary: "Get order along the order's items detials",
  })
  findOne(@Param('id') orderId: string) {
    return this.ordersService.findOne(+orderId);
  }

  @Put(':id/status')
  @ApiOperation({
    summary: 'Update order status',
  })
  @ApiBody({
    description: 'Update order status',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'DELIVERED' },
      },
    },
  })
  update(
    @Param('id') orderId: string,
    @Body() { status }: { status: OrderStatus },
  ) {
    return this.ordersService.update(+orderId, status);
  }

  @Post('apply-coupon')
  @ApiOperation({
    summary: 'Apply coupon to order',
  })
  @ApiBody({
    description: 'Apply coupon to order',
    schema: {
      type: 'object',
      properties: {
        orderId: { type: 'number', example: 1 },
        couponCode: { type: 'string', example: 'WINTER21' },
      },
    },
  })
  applyCoupon(
    @Body() { orderId, couponCode }: { orderId: number; couponCode: string },
  ) {
    return this.ordersService.applyCoupon(orderId, couponCode);
  }
}
