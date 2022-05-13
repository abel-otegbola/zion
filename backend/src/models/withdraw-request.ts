
export class WithdrawRequest {
  _id?: string;
  user_id?: string;
  user_wallet: {
    pubkey: string;
  };
  bot_wallet: {
    pubkey: string;
  };
  withdraw_amount: number;
}
