import * as mongoose from 'mongoose';

export const WithdrawRequestSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId },
    user_wallet: { pubkey: String },
    bot_wallet: { pubkey: String },
    withdraw_amount: { type: Number },
  },
  {
    timestamps: true,
  },
);
