import { Controller, Post, Body, Get, Request, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TransactionQueryDto } from 'src/transactions/dto/transaction-query.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginatedResponse } from 'src/types/ledger';

@Controller('api/v1/ledger')
export class LedgerController {
    constructor(private readonly ledgerService: LedgerService) { }

    @Post('/transactions')
    async createTransaction(@Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        return this.ledgerService.createTransaction(createTransactionDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/accounts/balance')
    async getAccountBalance(
        @Request() req,
        @Query() filters: TransactionQueryDto,
    ): Promise<object> {
        return this.ledgerService.getAccountBalance(req.user, filters);
    }
    @UseGuards(JwtAuthGuard)
    @Get('/transactions')
    async getTransactions(@Request() req, @Query(new ValidationPipe()) query: TransactionQueryDto): Promise<PaginatedResponse<Transaction>> {
        return this.ledgerService.getTransactions(req.user, query);
    }
}