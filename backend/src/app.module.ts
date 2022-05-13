/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActiveListingModule } from './modules/active-listing/active-listing.module';
import { AlertModule } from './modules/alerts/alert.module';
import { AuthModule } from './modules/auth/auth.module';
import { CollectionModule } from './modules/collections/collection.module';
import { TokenModule } from './modules/token/token.module';
// import { TransactionModule } from './modules/transactions/transaction.module';
import { UserModule } from './modules/users/user.module';
// import { TrustedNftModule } from './modules/trusted-nft/trusted-nft.module';
import { WhitelistModule } from './modules/whitelist/whitelist.module';
import { BotsModule } from './modules/bots/bots.module';

// eslint-disable-next-line prettier/prettier
// load .env
require('dotenv').config({ path: require('find-config')('.env') });

// console.debug(`process.env.DB_URI`, process.env.DB_URI);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    CollectionModule,
    AlertModule,
    AuthModule,
    // TransactionModule,
    TokenModule,
    ActiveListingModule,
    UserModule,
    // TrustedNftModule,
    WhitelistModule,
    BotsModule,
  ],
  // eslint-disable-next-line prettier/prettier
  controllers: [],
  providers: [],
})

export class AppModule {}
