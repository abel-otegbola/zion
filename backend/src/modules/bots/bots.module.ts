import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema } from '../collections/schemas/collection.schema';
import { UserSchema } from '../users/schemas/user.schema';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';
import {
  TradingBotSchema,
  TradingBotArchiveSchema,
} from './schema/trading-bot.schema';
import {
  TradingBotEventSchema,
} from './schema/trading-bot-event.schema';
import {
  WithdrawRequestSchema,
} from './schema/withdraw-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'trading_bots', schema: TradingBotSchema },
      { name: 'bot_withdraw_requests', schema: WithdrawRequestSchema },
      { name: 'users', schema: UserSchema },
      { name: 'bot_events', schema: TradingBotEventSchema },
      { name: 'nft_collections', schema: CollectionSchema },
      { name: 'trading_bots_archive', schema: TradingBotArchiveSchema },
    ]),
  ],
  controllers: [BotsController],
  providers: [BotsService],
})
export class BotsModule {}
