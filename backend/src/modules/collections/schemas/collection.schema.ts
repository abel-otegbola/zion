const mongoose = require('mongoose');

export const CollectionSchema = new mongoose.Schema(
  {
    key: { type: String },
    verified: { type: Boolean },
    name: { type: String },
    symbol: { type: String },
    candyMachineIds: [],
    image: { type: String },
    description: { type: String },
    website: { type: String },
    twitter: { type: String },
    discord: { type: String },
    totalItems: { type: String },
    available_traits: [
      { trait_type: String, values: [{ value: String, count: Number }] },
    ],
    available_attributes: [
      { trait_type: String, values: [{ value: String, count: Number }] },
    ],
    attributes_indexed: { type: Boolean },
    itemsTracked: { type: Boolean },
  },
  {
    timestamps: true,
  },
);
