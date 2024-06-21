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
import { CartItemsService } from './cart-items.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('api/cart')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post('/add')
  @ApiBody({
    description: 'Add item to cart',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        productId: { type: 'number', example: 1 },
      },
    },
  })
  add(@Body() addedItemDetails: { userId: number; productId: number }) {
    return this.cartItemsService.add(addedItemDetails);
  }

  @Put('/update')
  @ApiBody({
    description: 'Update item in cart',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        productId: { type: 'number', example: 1 },
        quantity: { type: 'number', example: 5 },
      },
    },
  })
  update(
    @Body()
    updatedItemDetails: {
      userId: number;
      productId: number;
      quantity: number;
    },
  ) {
    return this.cartItemsService.updateUsingUserId(updatedItemDetails);
  }

  @Get(':id')
  @ApiBody({
    description: 'Get cart items',
    schema: {
      type: 'object',
      properties: {
        cartId: { type: 'number', example: 1 },
      },
    },
  })
  findOne(@Param('id') cartId: string) {
    return this.cartItemsService.findOne(+cartId);
  }

  @Delete('/remove')
  @ApiBody({
    description: 'Remove item from cart',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        productId: { type: 'number', example: 1 },
      },
    },
  })
  remove(@Body() deletedItemDetails: { userId: number; productId: number }) {
    return this.cartItemsService.remove(deletedItemDetails);
  }
}
