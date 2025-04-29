import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './account.service';
import { Account } from './entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    providers: [AccountsService],
    controllers: [AccountsController],
    exports: [AccountsService],
})
export class AccountsModule { }