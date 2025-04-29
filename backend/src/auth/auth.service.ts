import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { TransactionService } from 'src/transactions/transaction.service';
import { CreateAccountOpeningTransactionDto } from 'src/transactions/dto/create-account-opening-transaction.dto';
import { EntryType } from 'src/entry/entities/entry.entity';
import { AccountsService } from 'src/accounts/account.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

@Injectable()
export class AuthService {
    constructor(
        private accountsService: AccountsService,
        private jwtService: JwtService,
        private transactionService: TransactionService,
    ) { }

    async register(createUserDto: CreateAccountDto) {
        const existingUser = await this.accountsService.findByEmail(createUserDto.email);

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.accountsService.create(createUserDto);
        const createAccountOpeningTransactionPayload: CreateAccountOpeningTransactionDto = {
            description: 'Account Opening',
            entries: [{ amount: 100, type: EntryType.CREDIT, accountId: user.id }]
        }
        const accountOpeningTransaction = this.transactionService.createAccountOpeningTransaction(createAccountOpeningTransactionPayload);
        const { password, ...result } = user;


        return { result, accountOpeningTransaction };
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
            user: {
                ...user,
                password: undefined,
            },
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.accountsService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }

    async verifyToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.accountsService.findById(payload.sub);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}