import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhitelistSchema } from './schemas/whitelist.schema';
import { WhitelistController } from './whitelist.controller';
import { WhitelistService } from './whitelist.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'whitelists', schema: WhitelistSchema },
    ]),
  ],
  controllers: [WhitelistController],
  providers: [WhitelistService],
})
export class WhitelistModule {}
