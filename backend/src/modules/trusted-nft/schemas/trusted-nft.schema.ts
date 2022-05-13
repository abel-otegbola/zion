const mongoose = require('mongoose');

export const TrustedNftSchema = new mongoose.Schema(
  {
    token_mint_address: { type: <String[]>[] },
  },
  { timestamps: true },
);
