import { Module } from '@nestjs/common';

import { EntryController } from './entry.controller';

import { Account } from 'src/accounts/entities/account.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Entry } from './entities/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Account, Transaction, Entry])],
    controllers: [EntryController],
    providers: [],
})
export class EntryModule {

}
