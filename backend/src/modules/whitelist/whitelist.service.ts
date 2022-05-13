import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Whitelist } from 'src/models/WhiteList';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectModel('whitelists')
    private readonly whitelistModel: Model<Whitelist>,
  ) {}

  async joinWhitelist(whitelist: Whitelist): Promise<any> {
    const userWalletIdInfo = await this.whitelistModel.findOne({
      walletId: whitelist.walletId,
    });

    // TODO: user should sign a message verifying their ownership of 
    // the whitelist.walletId

    const twitterWalletIdInfo = await this.whitelistModel.findOne({
      twitterId: whitelist.twitterId,
    });

    if (userWalletIdInfo || twitterWalletIdInfo) {
      throw new HttpException('already exists', 401);
    }

    const whitelist_doc = await this.whitelistModel.create(whitelist);
    return true;
  }
}
