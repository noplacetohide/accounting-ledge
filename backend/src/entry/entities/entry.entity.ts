import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { IsEnum, IsNumber, Min } from 'class-validator';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Account } from 'src/accounts/entities/account.entity';

export enum EntryType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
}

@Entity()
export class Entry {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.entries, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'transactionId' })
    transaction: Transaction;

    @Column()
    transactionId: number;

    @ManyToOne(() => Account, (account) => account.entries)
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @Column()
    accountId: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    @IsNumber()
    amount: number;

    @Column({ type: 'enum', enum: EntryType })
    @IsEnum(EntryType)
    type: EntryType;
}