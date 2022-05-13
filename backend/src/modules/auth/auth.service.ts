import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
const jsonwebtoken = require('jsonwebtoken');
import { User } from './../../models/user';
import { JWT, JWT_KEY } from './jwt';
import * as solana from '@solana/web3.js';

@Injectable()
export class AuthService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  async signup(user: User): Promise<User> {
    throw new Error();
    const userInfo = new this.userModel(user);
    return userInfo.save();
  }

  async fetchTokenAccounts(pubkey: string) {
    const connection = new solana.Connection(process.env.SOLANA_RPC, 'confirmed')

    /*
    let filter: solana.TokenAccountsFilter = {
      programId: new solana.PublicKey('TOKEN_PROGRAM_ID'),
    };
    let token_accounts = (await connection.getTokenAccountsByOwner(
      new solana.PublicKey(pubkey),
      filter,
    )).value;

    token_accounts = token_accounts.filter(async (ta) => {
      let balance = (await connection.getTokenAccountBalance(ta.pubkey)).value;
      if (!balance.uiAmount) return false;
      // TODO: use @spl-token lib to fetch & parse token-accounts..
    });
    */

    return Promise.resolve([])
  }

  signToken(jwt: JWT): string {
    const token = jsonwebtoken.sign(
      jwt,
      JWT_KEY,
      { expiresIn: '6h' },
    )
    // console.debug(`signToken`, jwt, token)
    return token
  }
  
  decodeToken(token: string): JWT {
    const decoded = jsonwebtoken.verify(token, JWT_KEY) as JWT
    // console.debug(`decodeToken`, decoded)
    return decoded
  }

}
