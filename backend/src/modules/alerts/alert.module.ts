import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from '../transactions/schemas/transaction.schema';

import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { AlertSchema } from './schemas/alert.schema';
import { CollectionService } from './../collections/collection.service';
import { CollectionSchema } from '../collections/schemas/collection.schema';
import { TokenSchema } from './../token/schemas/token.schema';
import { TokenService } from '../token/token.service';
import { TradingBotEventSchema } from '../bots/schema/trading-bot-event.schema';
import { SellOrdersSchema } from "../token/schemas/sellorders.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Alert', schema: AlertSchema },
      { name: 'transactions_mev2', schema: TransactionSchema },
      { name: 'nft_collections', schema: CollectionSchema },
      { name: 'tokens', schema: TokenSchema },
      { name: 'bot_events', schema: TradingBotEventSchema },
      { name: 'sell_orders', schema: SellOrdersSchema },
    ]),
  ],
  controllers: [AlertController],
  providers: [AlertService, CollectionService, TokenService],
})
export class AlertModule {}
