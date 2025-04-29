import { Entry } from 'src/entry/entities/entry.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @CreateDateColumn()
    transactionDate: Date;

    @Column({ nullable: true })
    description?: string;

    @OneToMany(() => Entry, (entry) => entry.transaction, { cascade: true })
    entries: Entry[];
}