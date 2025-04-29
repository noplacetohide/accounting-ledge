import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './exception.filter';
import { TransactionModule } from './transactions/transaction.module';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { Entry } from './entry/entities/entry.entity';
import { LedgerModule } from './ledger/ledger.module';


@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Account, Transaction, Entry],
        synchronize: configService.get('NODE_ENV') !== 'production',
        ssl: {
          ca: configService.get('DB_CA_CERT'),
          rejectUnauthorized: false
        },
      }),
    }),
    AuthModule,
    AccountsModule,
    TransactionModule,
    LedgerModule
  ],
})
export class AppModule { }