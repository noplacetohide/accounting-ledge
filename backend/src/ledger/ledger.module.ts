import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import { AccountsService } from 'src/accounts/account.service';



@Module({
    imports: [TypeOrmModule.forFeature([Account, Transaction, Entry])],
    controllers: [LedgerController],
    providers: [AccountsService, LedgerService],
})
export class LedgerModule { }