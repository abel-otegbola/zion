import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../../models/transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('transactions_mev2')
    private readonly transactionModel: Model<Transaction>,
  ) {}

  /*addTransaction(transaction: Transaction): Promise<Transaction> {
    const transactionInfo = new this.transactionModel(transaction);
    return transactionInfo.save();
  }*/
}
