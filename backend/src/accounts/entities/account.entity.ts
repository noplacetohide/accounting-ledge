import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Entry } from 'src/entry/entities/entry.entity';

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}


@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @Column({ unique: true, type: 'varchar', length: 12, name: 'account_number' })
    accountNumber: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Entry, (entry) => entry.account)
    entries: Entry[];

    @BeforeInsert()
    async handleBeforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
