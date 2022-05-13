import { Controller, Post, Body } from '@nestjs/common';
import { TrustedNft } from 'src/models/trusted-nft';
import { TrustedNftService } from './trusted-nft.service';

@Controller('trustedNft')
export class TrustedNftController {
  constructor(private readonly trustedNftService: TrustedNftService) {}

  // @Post('verifyMintAddress')
  // async checkNft(@Body() token_mint_address_check: TrustedNft): Promise<any> {
  //  return this.trustedNftService.checkNft(token_mint_address_check);
  // }
}
