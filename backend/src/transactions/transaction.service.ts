import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Entry } from 'src/entry/entities/entry.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Repository, In } from 'typeorm';
import { CreateAccountOpeningTransactionDto } from './dto/create-account-opening-transaction.dto';
import { CreateEntryDto } from 'src/entry/dto/create-entry.dto';


@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
    ) { }

    async createAccountOpeningTransaction(
        createAccountOpeningTransactionDto: CreateAccountOpeningTransactionDto,
    ): Promise<Transaction> {
        const { description, entries } = createAccountOpeningTransactionDto;

        // Validate that there are at least two entries (although for account opening, it might be one)
        if (entries.length < 1) {
            throw new BadRequestException('An account opening transaction must have at least one entry.');
        }


        // Verify that all provided account IDs exist
        const accountIds = entries.map((entry) => entry.accountId);
        const existingAccounts = await this.accountRepository.findBy({ id: In(accountIds) });
        if (existingAccounts.length !== accountIds.length) {
            throw new BadRequestException('One or more provided Account IDs do not exist.');
        }

        const transaction = this.transactionRepository.create({
            description,
            entries: entries.map((entryDto) => this.entryRepository.create(entryDto)),
        });

        return this.transactionRepository.save(transaction);
    }

}

// async getAccountBalance(accountId: number): Promise<number> {
//     const account = await this.accountRepository.findOneBy({ id: accountId });
//     if (!account) {
//         throw new NotFoundException(`Account with ID ${accountId} not found.`);
//     }

//     const entries = await this.entryRepository.find({
//         where: { accountId },
//     });

//     let balance = 0;
//     for (const entry of entries) {
//         if (entry.type === EntryType.DEBIT) {
//             balance += Number(entry.amount);
//         } else if (entry.type === EntryType.CREDIT) {
//             balance -= Number(entry.amount);
//         }
//     }

//     return balance;
// }

// async getTransactions(query: TransactionQueryDto): Promise<Transaction[]> {
//     const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');

//     if (query.accountId) {
//         queryBuilder.innerJoin('transaction.entries', 'entry', 'entry.accountId = :accountId', { accountId: query.accountId });
//     }

//     if (query.startDate) {
//         queryBuilder.andWhere('transaction.transactionDate >= :startDate', { startDate: query.startDate });
//     }

//     if (query.endDate) {
//         queryBuilder.andWhere('transaction.transactionDate <= :endDate', { endDate: query.endDate });
//     }

//     return queryBuilder.getMany();
// }