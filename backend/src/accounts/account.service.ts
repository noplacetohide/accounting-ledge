import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private accountsRepository: Repository<Account>,
        private dataSource: DataSource,
    ) { }

    async create(createUserDto: CreateAccountDto): Promise<Account> {

        const result = await this.dataSource.query(`SELECT nextval('account_number_seq')`);
        const accountNumber = result[0].nextval.toString().padStart(12, '0');

        const account = this.accountsRepository.create({ ...createUserDto, accountNumber });
        console.log("account ", account)
        return this.accountsRepository.save(account);
    }

    async findByEmail(email: string): Promise<Account | null> {
        return this.accountsRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<Account | null> {
        return this.accountsRepository.findOne({ where: { id } });
    }
}
