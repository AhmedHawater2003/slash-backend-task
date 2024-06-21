import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { get } from 'http';

@Injectable()
export class CartItemsService {
  constructor(private prismaService: PrismaService) {}

  async add(addedItemDetails: { userId: number; productId: number }) {
    const userCart = await this.getUserCart(addedItemDetails.userId);
    const productQuantity = await this.getCartProductQuantity(
      userCart.cartId,
      addedItemDetails.productId,
    );
    if (productQuantity) {
      return this.updateUsingCartId({
        cartId: userCart?.cartId,
        productId: addedItemDetails.productId,
        quantity: productQuantity + 1,
      });
    }
    return this.create(userCart.cartId, addedItemDetails.productId);
  }

  async create(cartId: number, productId: number) {
    return this.prismaService.cartItems.create({
      data: {
        cart: { connect: { cartId: cartId } },
        product: { connect: { productId: productId } },
      },
    });
  }

  findOne(cartId: number) {
    return this.prismaService.cartItems.findMany({
      where: {
        cartId: cartId,
      },
    });
  }

  async updateUsingUserId(updatedItemDetails: {
    userId: number;
    productId: number;
    quantity: number;
  }) {
    const userCart = await this.getUserCart(updatedItemDetails.userId);
    return this.updateUsingCartId({
      cartId: userCart.cartId,
      productId: updatedItemDetails.productId,
      quantity: updatedItemDetails.quantity,
    });
  }

  async updateUsingCartId(updatedItemDetails: {
    cartId: number;
    productId: number;
    quantity: number;
  }) {
    // check if quantity does not exceed prodcut stock
    const product = await this.prismaService.products.findUnique({
      where: { productId: updatedItemDetails.productId },
    });
    if (product.stock < updatedItemDetails.quantity) {
      throw new BadRequestException('Quantity exceeds product stock');
    }

    return this.prismaService.cartItems.update({
      where: {
        cartId_productId: {
          cartId: updatedItemDetails.cartId,
          productId: updatedItemDetails.productId,
        },
      },
      data: {
        quantity: updatedItemDetails.quantity,
      },
    });
  }

  remove(deletedItemDetails: { userId: number; productId: number }) {
    return this.prismaService.cartItems.delete({
      where: {
        cartId_productId: {
          cartId: deletedItemDetails.userId,
          productId: deletedItemDetails.productId,
        },
      },
    });
  }

  async getUserCart(userId: number) {
    return this.prismaService.cart.findFirst({
      where: { userId: userId },
    });
  }

  async getCartProductQuantity(cartId: number, productId: number) {
    const { quantity } =
      (await this.prismaService.cartItems.findFirst({
        where: {
          cartId: cartId,
          productId: productId,
        },
        select: {
          quantity: true,
        },
      })) ?? {};
    return quantity;
  }
}
