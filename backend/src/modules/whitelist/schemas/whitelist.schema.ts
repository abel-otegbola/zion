const mongoose = require('mongoose');

export const WhitelistSchema = new mongoose.Schema(
  {
    walletId: { type: String },
    twitterId: { type: String },
  },
  { timestamps: true },
);
