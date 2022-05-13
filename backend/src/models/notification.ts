import { ApiProperty } from '@nestjs/swagger';

export class Notification {
  @ApiProperty({ type: Object, description: 'Token Mint Address' })
  token_mint_address?: string;
  @ApiProperty({ type: Object, description: 'MarketPlace' })
  marketPlace?: string;
  @ApiProperty({ type: Object, description: 'Token Name' })
  tokenName?: string;
  @ApiProperty({ type: Object, description: 'Collection Name' })
  collectionName?: string;
  @ApiProperty({ type: Object, description: 'Alert Type' })
  eventType?: string;
  @ApiProperty({ type: Object, description: 'Amount' })
  amount?: number;
  @ApiProperty({ type: Object, description: 'Image Url' })
  imageUrl?: string;

  constructor(data: {
    token_mint_address?: string;
    marketPlace?: string;
    tokenName?: string;
    collectionName?: string;
    eventType?: string;
    amount?: number;
    imageUrl?: string;
  }) {
    if (!data) {
      data = {};
    }
    this.token_mint_address = data.token_mint_address || null;
    this.marketPlace = data.marketPlace || null;
    this.tokenName = data.tokenName || null;
    this.collectionName = data.collectionName || null;
    this.eventType = data.eventType || null;
    this.amount = data.amount || null;
    this.imageUrl = data.imageUrl || null;
  }
}
