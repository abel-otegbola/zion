import { ApiProperty } from '@nestjs/swagger';
export class TrustedNft {
  _id?: string;
  token_mint_address?: any[];

  constructor(data: { _id?: string; token_mint_address?: any[] }) {
    if (!data) {
      data = {};
    }
    this._id = data._id || null;
    this.token_mint_address = data.token_mint_address || null;
  }
}
