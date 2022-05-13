import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

import { CollectionSchema } from './schemas/collection.schema';
import { TokenSchema } from './../token/schemas/token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'nft_collections', schema: CollectionSchema },
      { name: 'tokens', schema: TokenSchema },
    ]),
  ],
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
