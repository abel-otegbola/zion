import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActiveListingSchema } from './schemas/active-listing.schema';
import { ActiveListingController } from './acitve-listing.controller';
import { ActiveListingService } from './active-listing.service';
import { TokenService } from './../token/token.service';
import { TokenSchema } from './../token/schemas/token.schema';
import { SellOrdersSchema } from "../token/schemas/sellorders.schema";
import { TransactionSchema } from './../transactions/schemas/transaction.schema';

@Module({
  imports: [
  MongooseModule.forFeature([
      { name: 'active_listings', schema: ActiveListingSchema },
      { name: 'sell_orders', schema: SellOrdersSchema },
      { name: 'tokens', schema: TokenSchema },
      { name: 'transactions_mev2', schema: TransactionSchema },
    ]),
  ],
  controllers: [ActiveListingController],
  providers: [ActiveListingService, TokenService],
})
export class ActiveListingModule {}
