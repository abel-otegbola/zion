const mongoose = require('mongoose');

export const SellOrdersSchema = new mongoose.Schema(
  {
    _id: { type: String },
    amount: { type: Number, required: false },
    collection_id: { type: mongoose.Types.ObjectId, required: false },
    mint: { type: String, required: true },
    seller_wallet: { type: String, required: true },
    seller_token_account: { type: String, required: true },
  },
  {
    timestamps: false,
  },
);
