import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import { TransactionService } from './transaction.service';
import { AccountsService } from 'src/accounts/account.service';



@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Account, Entry])],
    controllers: [],
    providers: [AccountsService, TransactionService],
    exports: [TransactionService],
})
export class TransactionModule { }