import { ApiProperty } from '@nestjs/swagger';
export class Whitelist {
  @ApiProperty({ type: String, description: 'User Id' })
  _id?: string;

  @ApiProperty({ type: String, description: 'Wallet Id' })
  walletId?: string;

  @ApiProperty({ type: String, description: 'Twitter Id' })
  twitterId?: string;

  @ApiProperty({ type: String, description: 'Created At' })
  createdAt?: string;

  @ApiProperty({ type: String, description: 'Updated At' })
  updatedAt?: string;

  @ApiProperty({ type: String, description: 'JWT token' })
  token?: string;

  constructor(data: {
    _id?: string;
    walletId?: string;
    twitterId?: string;
    createdAt?: string;
    updatedAt?: string;
    token?: string;
  }) {
    if (!data) {
      data = {};
    }
    this._id = data._id || null;
    this.walletId = data.walletId || null;
    this.twitterId = data.twitterId || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.token = data.token || null;
  }
}
