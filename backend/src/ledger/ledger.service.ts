import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Entry, EntryType } from 'src/entry/entities/entry.entity';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { TransactionQueryDto } from 'src/transactions/dto/transaction-query.dto';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { PaginatedResponse } from 'src/types/ledger';
import { Repository, In } from 'typeorm';


@Injectable()
export class LedgerService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Entry)
        private readonly entryRepository: Repository<Entry>,
    ) { }

    async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        let { description, sourceAccount, destinationAccount, amount } = createTransactionDto;
        sourceAccount = sourceAccount?.trim();
        destinationAccount = destinationAccount?.trim();
        if (sourceAccount === destinationAccount) {
            throw new BadRequestException('Source and destination accounts must be different.');
        }
        const accountNumbers = [sourceAccount, destinationAccount];
        const existingAccounts = await this.accountRepository.findBy({ accountNumber: In(accountNumbers) });
        console.log({ existingAccounts })
        if (existingAccounts.length !== 2) {
            throw new BadRequestException('One or more provided accounts do not exist.');
        }
        const sourceAccountDetails = existingAccounts.find(account => account.accountNumber === sourceAccount) as Account;
        const destinationAccountDetails = existingAccounts.find(account => account.accountNumber === destinationAccount) as Account;
        console.log(sourceAccountDetails.id)
        const result = await this.entryRepository
            .createQueryBuilder('entry')
            .select('SUM(CASE WHEN entry.type = :credit THEN entry.amount ELSE 0 END)', 'totalCredit')
            .addSelect('SUM(CASE WHEN entry.type = :debit THEN entry.amount ELSE 0 END)', 'totalDebit')
            .where('entry.accountId = :accountId', { accountId: sourceAccountDetails.id })
            .setParameters({ credit: EntryType.CREDIT, debit: EntryType.DEBIT })
            .getRawOne();

        const totalCredit = parseFloat(result.totalCredit || 0);
        const totalDebit = parseFloat(result.totalDebit || 0);
        if (amount > (totalCredit - totalDebit)) {
            throw new BadRequestException('insufficient amount transfer requested, please check your balance!');
        }

        const entries = [
            { amount, type: EntryType.DEBIT, accountId: sourceAccountDetails.id },
            { amount, type: EntryType.CREDIT, accountId: destinationAccountDetails.id },
        ]
        const transaction = this.transactionRepository.create({ description, entries });
        return this.transactionRepository.save(transaction);
    }

    async getAccountBalance(user: Account, filters?: TransactionQueryDto): Promise<object> {
        console.log({ user })
        const userAccountId = user.id;

        const account = await this.accountRepository.findOneBy({ id: userAccountId });
        if (!account) {
            throw new NotFoundException(`Account with ID ${userAccountId} not found.`);
        }

        const entries = await this.entryRepository.find({
            where: { accountId: userAccountId },
        });

        let balance = 0;
        for (const entry of entries) {
            if (entry.type === EntryType.DEBIT) {
                balance -= Number(entry.amount);
            } else if (entry.type === EntryType.CREDIT) {
                balance += Number(entry.amount);
            }
        }

        return { data: { balance } };
    }


    async getTransactions(user: Account, query: TransactionQueryDto): Promise<PaginatedResponse<Transaction>> {
        const queryBuilder = this.transactionRepository.createQueryBuilder('transaction');
        console.log({ user })
        const userAccountId = user.id;
        console.log('👉🏻 Line 92 : ', userAccountId);

        if (userAccountId) {
            queryBuilder.innerJoin(
                'transaction.entries',
                'entryFilter',
                'entryFilter.accountId = :accountId' +
                (query.entryType ? ' AND entryFilter.type = :entryType' : ''),
                {
                    accountId: userAccountId,
                    ...(query.entryType && { entryType: query.entryType })
                }
            );
        }
        queryBuilder
            .leftJoin('transaction.entries', 'entry')
            .addSelect([
                'entry.id',
                'entry.type',
                'entry.amount',
                'account.accountNumber'
            ]);
        queryBuilder.leftJoin('entry.account', 'account', 'account.id = entry.accountId')
            .addSelect('account.accountNumber');

        if (query.startDate) {
            queryBuilder.andWhere('transaction.transactionDate >= :startDate', { startDate: query.startDate });
        }

        if (query.endDate) {
            queryBuilder.andWhere('transaction.transactionDate <= :endDate', { endDate: query.endDate });
        }

        queryBuilder.orderBy('transaction.transactionDate', 'DESC');

        const page = parseInt(String(query.page)) || 1;
        const limit = parseInt(String(query.limit)) || 10;
        const skip = (page - 1) * limit;

        const total = await queryBuilder.getCount();

        queryBuilder.skip(skip).take(limit);

        const transactions = await queryBuilder.getMany();

        return {
            data: transactions,
            pagination: {
                total,
                currentPageTotal: transactions.length,
                limit,
                totalPages: Math.ceil(total / limit),
                page
            }
        };
    }
}