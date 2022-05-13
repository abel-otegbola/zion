const mongoose = require('mongoose');

export const ActiveListingSchema = new mongoose.Schema(
  {
    _id: { type: String },
    marketplace: { type: String },
    amount: { type: Number },
    collection_name: { type: String }
  },
  {
    timestamps: true,
  },
);
