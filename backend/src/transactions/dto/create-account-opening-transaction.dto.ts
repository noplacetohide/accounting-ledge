import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntryDto } from 'src/entry/dto/create-entry.dto';
export class CreateAccountOpeningTransactionDto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateEntryDto)
    entries: CreateEntryDto[];
}