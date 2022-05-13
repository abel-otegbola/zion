import { ApiProperty } from '@nestjs/swagger';

export class TransactionParsed {
  @ApiProperty({ type: Object, description: 'Marketplace' })
  marketplace?: string;

  @ApiProperty({ type: Object, description: 'Marketplace Program Id' })
  marketplace_program_id?: string;

  @ApiProperty({ type: Object, description: 'Evernt Type' })
  event_type?: string;

  @ApiProperty({ type: Object, description: 'Seller Wallet Pubkey' })
  seller_wallet_pubkey?: string;

  @ApiProperty({ type: Object, description: 'Seller Token account' })
  seller_token_account?: string;

  @ApiProperty({ type: Object, description: 'Seller Escrow Account' })
  seller_escrow_acount?: string;

  @ApiProperty({ type: Object, description: 'Token Mint Address' })
  mint?: string;

  @ApiProperty({ type: Object, description: 'Metadata Address' })
  metadata?: string;

  @ApiProperty({ type: Object, description: 'Price' })
  amount?: number;

  @ApiProperty({ type: Object, description: 'Amount Lamports' })
  amount_lamports?: number;

  @ApiProperty({ type: Object, description: 'Trade State Bump' })
  trade_state_bump?: number;

  @ApiProperty({ type: Object, description: 'Program As Signer Bump' })
  program_as_signer_bump?: number;

  @ApiProperty({ type: Object, description: 'Collection Id' })
  collection_id?: string;

  @ApiProperty({ type: Object, description: 'Token Name' })
  token_name?: string;

  @ApiProperty({ type: Object, description: 'Collection Name' })
  collection_name?: string;
}

export class Transaction {
  @ApiProperty({ type: String, description: 'Id' })
  _id?: string;

  @ApiProperty({ type: String, description: 'Block Time' })
  bt?: number;

  @ApiProperty({ type: TransactionParsed, description: 'Parsed Object' })
  parsed?: TransactionParsed;

  @ApiProperty({ type: String, description: 'Created At' })
  createdAt?: string;

  constructor(data: {
    _id?: string;
    bt?: number;
    parsed?: TransactionParsed;
    createdAt?: string;
  }) {
    if (!data) {
      data = {};
    }

    this._id = data._id || null;
    this.bt = data.bt || null;
    this.parsed = data.parsed || null;
    this.createdAt = data.createdAt || null;
  }
}
