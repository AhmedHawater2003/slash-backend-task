import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { get } from 'http';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(orderDetails: { userId: number }) {
    const userCart = await this.getUserCart(orderDetails.userId);

    const cartProducts = await this.getCartProducts(userCart?.cartId);

    if (cartProducts.length === 0) {
      return { message: 'Cart is empty' };
    }

    let totalPrice = 0;
    return this.prismaService.orders.create({
      data: {
        user: { connect: { userId: orderDetails.userId } },
        orderItems: {
          create: cartProducts.map((cartItem) => {
            totalPrice += cartItem.product.price.toNumber() * cartItem.quantity;
            return {
              product: { connect: { productId: cartItem.product.productId } },
              quantity: cartItem.quantity,
              price: cartItem.product.price,
            };
          }),
        },
        totalPrice: new Decimal(totalPrice),
        totalAfterDiscount: totalPrice,
      },
    });
  }

  findOne(orderId: number) {
    return this.prismaService.orders.findUnique({
      where: { orderId: orderId },
      include: { orderItems: true },
    });
  }

  update(orderId: number, status: OrderStatus) {
    return this.prismaService.orders.update({
      where: { orderId: orderId },
      data: { status: status },
    });
  }

  async getUserCart(userId: number) {
    return this.prismaService.cart.findFirst({
      where: { userId: userId },
    });
  }

  async getCartProducts(userId: number) {
    return this.prismaService.cartItems.findMany({
      where: { cartId: userId },
      select: {
        quantity: true,
        product: { select: { price: true, productId: true } },
      },
    });
  }

  async applyCoupon(orderId: number, couponCode: string) {
    const order = await this.prismaService.orders.findUnique({
      where: { orderId: orderId },
    });

    if (!order) {
      return { message: 'Order not found' };
    }

    if (
      order.status === OrderStatus.PENDING ||
      order.status === OrderStatus.PROCESSING
    ) {
      const coupon = await this.prismaService.coupons.findFirst({
        where: { code: couponCode },
      });

      if (!coupon) {
        return { message: 'Invalid coupon' };
      }

      if (new Date() > coupon.expiry) {
        return { message: 'Coupon expired' };
      }

      return this.prismaService.orders.update({
        where: { orderId: orderId },
        data: {
          couponCode: coupon.code,
          totalAfterDiscount: order.totalPrice.sub(
            (+coupon.discount / 100) * +order.totalPrice,
          ),
        },
      });
    } else {
      return { message: 'Order cannot be modified' };
    }
  }
}
