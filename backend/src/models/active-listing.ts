import { ApiProperty } from '@nestjs/swagger';
export class ActiveListing {
  @ApiProperty({ type: String, description: 'Id' })
  _id?: string;

  @ApiProperty({ type: String, description: 'marketplace' })
  marketplace?: string;

  @ApiProperty({ type: String, description: 'amount' })
  amount?: number;

  @ApiProperty({ type: String, description: 'Name' })
  name?: string;

  @ApiProperty({ type: String, description: 'Rank' })
  rank?: number;

  @ApiProperty({ type: String, description: 'Image Url' })
  image?: string;

  constructor(data?: {
    _id?: string;
    marketplace?: string;
    amount?: number;
    name?: string;
    rank?: number;
    image?: string;
    token_mint_address?: string;
  }) {
    if (!data) {
      data = {};
    }

    this._id = data._id || null;
    this.marketplace = data.marketplace || null;
    this.amount = data.amount || null;
    this.name = data.name || null;
    this.rank = data.rank || null;
    this.image = data.image || null;
  }
}

export class ActiveListingResponse {
  data: ActiveListing[];
  dataCount: number;

  constructor(data: { data?: ActiveListing[]; dataCount?: number }) {
    this.data = data.data || [];
    this.dataCount = data.dataCount || 0;
  }
}
