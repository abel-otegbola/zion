import * as mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger';

export class UserAuthToken {
  _id?: string; // jwt token id (as UUID)..
  user_id?: mongoose.Types.ObjectId;
  user_wallet_pubkey?: string;
  trusted_mint?: string;
  expires?: Date;
};

export class User {
  _id?: string;

  walletId?: string;
  bot_wallet?: string;

  @ApiProperty({ type: String, description: 'Created At' })
  createdAt?: string;

  @ApiProperty({ type: String, description: 'Updated At' })
  updatedAt?: string;

  constructor(data: {
    _id?: string;
    walletId?: string;
    createdAt?: string;
    updatedAt?: string;
  }) {
    if (!data) {
      data = {};
    }
    this._id = data._id || null;
    this.walletId = data.walletId || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}
