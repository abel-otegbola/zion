const mongoose = require('mongoose');

export const TransactionMev2Schema = new mongoose.Schema(
  {
    _id: { type: String },
    bt: { type: Number },
    tx: { type: {} },
    parsed: { type: {} },
  }
);
