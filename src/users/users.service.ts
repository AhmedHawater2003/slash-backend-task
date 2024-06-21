import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOrdersHistory(userId: number) {
    return this.prismaService.orders.findMany({
      where: { userId: userId },
      include: { orderItems: true },
    });
  }
}
