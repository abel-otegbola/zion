import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellOrdersSchema } from "./schemas/sellorders.schema";
import { TokenSchema } from './schemas/token.schema';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { TransactionSchema } from './../transactions/schemas/transaction.schema';

@Module({
  imports: [
  MongooseModule.forFeature([
      { name: 'tokens', schema: TokenSchema },
      { name: 'sell_orders', schema: SellOrdersSchema },
      { name: 'transactions_mev2', schema: TransactionSchema },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule { }
