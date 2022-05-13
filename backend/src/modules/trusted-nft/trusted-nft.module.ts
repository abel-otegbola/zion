import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrustedNftSchema } from './schemas/trusted-nft.schema';
import { TrustedNftController } from './trusted-nft.controller';
import { TrustedNftService } from './trusted-nft.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'trusted_nfts',
        schema: TrustedNftSchema,
      },
    ]),
  ],
  controllers: [TrustedNftController],
  providers: [TrustedNftService],
})
export class TrustedNftModule {}
