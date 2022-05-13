import * as mongoose from 'mongoose';

export const TradingBotSchema = new mongoose.Schema(
  {
    name: String,
    user_id: { type: mongoose.Types.ObjectId },
    bot_wallet: {
      pubkey: String,
      balance: { type: mongoose.Types.Decimal128, default: 0 },
    },
    config: {
      after_purchase: {
        deactivate: Boolean,
        deactivate_threshold: { type: Number, default: 1 },
      },
      marketplace: { type: String, default: 'MAGICEDEN' },
      collection_id: { type: mongoose.Types.ObjectId },
      collectionName: String,
      rank_range: { min: Number, max: Number },
      price_range: {
        min: { type: mongoose.Types.Decimal128, default: 0 },
        max: { type: mongoose.Types.Decimal128, default: 500 },
      },
      attributes: [
        {
          _id: false,
          trait_type: String,
          value: [],
        },
      ],
    },
    active: { type: Boolean, default: true },
    user_wallet: { pubkey: String },
    callsign: { type: String },
    bracket: { type: String },
    isDeleted: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

export const TradingBotArchiveSchema = new mongoose.Schema(
  {
    name: String,
    user_id: { type: mongoose.Types.ObjectId },
    bot_wallet: {
      pubkey: String,
      balance: { type: mongoose.Types.Decimal128, default: 0 },
    },
    config: {
      after_purchase: {
        deactivate: Boolean,
        deactivate_threshold: { type: Number, default: 1 },
      },
      marketplace: { type: String, default: 'MAGICEDEN' },
      collection_id: { type: mongoose.Types.ObjectId },
      collectionName: String,
      rank_range: { min: Number, max: Number },
      price_range: {
        min: { type: mongoose.Types.Decimal128, default: 0 },
        max: { type: mongoose.Types.Decimal128, default: 500 },
      },
      attributes: [
        {
          _id: false,
          trait_type: String,
          value: [],
        },
      ],
    },
    active: { type: Boolean, default: true },
    user_wallet: { pubkey: String },
    callsign: { type: String },
    bracket: { type: String },
  },
  {
    timestamps: true,
  },
);
