import { ArrayMinSize, IsArray, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntryDto } from 'src/entry/dto/create-entry.dto';


export class CreateTransactionDto {
    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    sourceAccount: string;

    @IsString()
    destinationAccount: string;

}