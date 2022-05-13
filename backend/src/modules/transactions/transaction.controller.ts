import { Body, Controller, Post } from '@nestjs/common';
import { Transaction } from "../../models/transaction";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {

  constructor(private readonly transactionService: TransactionService) { }

  /*@Post("addTransaction")
  addTransaction(@Body() transaction: Transaction): Promise<Transaction> {
    return this.transactionService.addTransaction(transaction);
  }*/
}
