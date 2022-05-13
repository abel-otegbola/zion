
export class TradingBotArchive {
  _id?: string;
  name?: string;
  user_id?: string;
  bot_wallet?: { pubkey?: string; balance?: number };
  deactivate?: boolean;
  config?: {
    after_purchase?: {
      deactivate?: boolean;
      deactivate_threshold?: number;
    };
    marketplace?: string;
    collection_id?: string;
    collectionName?: string;
    price_range?: { min?: number; max?: number };
    rank_range?: { min?: number; max?: number };
    attributes?: [
      { trait_type?: string; values?: [{ value?: string; count?: number }] },
    ];
  };
  active: boolean;
  user_wallet?: { pubkey?: string };
  callsign?: string;
  bracket?: string;
}
