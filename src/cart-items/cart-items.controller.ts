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
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('api/cart')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post('/add')
  @ApiOperation({
    summary: "Add item to user's cart",
  })
  @ApiBody({
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
  @ApiOperation({
    summary: 'Update item quantity in cart',
  })
  @ApiBody({
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
  @ApiOperation({
    summary:
      "Get all items in a user's cart by cart id. This will return all items in the cart along with the product details.",
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Cart ID',
  })
  findOne(@Param('id') cartId: string) {
    return this.cartItemsService.findOne(+cartId);
  }

  @Delete('/remove')
  @ApiOperation({
    summary: "Remove item from user's cart",
  })
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
