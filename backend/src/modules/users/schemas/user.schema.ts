const mongoose = require('mongoose');

export const UserSchema = new mongoose.Schema(
  {
    walletId: { type: String },
  },
  { timestamps: true },
);
