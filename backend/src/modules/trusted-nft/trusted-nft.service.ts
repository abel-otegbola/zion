import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrustedNft } from 'src/models/trusted-nft';

@Injectable()
export class TrustedNftService {
  constructor(
    @InjectModel('trusted_nfts')
    private readonly trustedNftModel: Model<TrustedNft>,
  ) {}

  // TODO: this check should occur once we have verified the 
  // user's wallet address
  async checkNft(token_mint_address_check: TrustedNft): Promise<any> {
    throw new Error();

    const mintAddressArray = token_mint_address_check.token_mint_address;
    const query = {
      token_mint_address: { $in: mintAddressArray },
    };

    const matchedMints = await this.trustedNftModel.find(query).exec();

    let status = false;
    const mapping = mintAddressArray.filter((element) => {
      const match = matchedMints.find((value) => {
        return element == value.token_mint_address;
      });
      if (match) {
        status = true;
        return true;
      }
      else {
        return false;
      }
    });
    return { status, mapping };
  }
}
