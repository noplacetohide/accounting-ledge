import { IsNumber, IsPositive, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { EntryType } from '../entities/entry.entity';

export class CreateEntryDto {
    @IsString()
    @IsNotEmpty()
    accountId: string;

    @IsNumber()
    amount: number;

    @IsEnum(EntryType)
    type: EntryType;
}