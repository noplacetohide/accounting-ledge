import { Type } from 'class-transformer';
import { IsOptional, IsDateString, IsNumberString, IsUUID, IsEnum, IsInt, Min, Max } from 'class-validator';
import { EntryType } from 'src/entry/entities/entry.entity';

export class TransactionQueryDto {
    @IsOptional()
    @IsUUID()
    accountId?: string;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsEnum(EntryType)
    @IsOptional()
    entryType?: EntryType;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit?: number = 10;
}