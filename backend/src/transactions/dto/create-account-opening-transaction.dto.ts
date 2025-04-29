import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntryDto } from 'src/entry/dto/create-entry.dto';


// export class CreateAccountOpeningTransactionDto {
//     description?: string;

//     @IsArray()
//     @ArrayMaxSize(1)
//     @ValidateNested({ each: true })
//     @Type(() => CreateEntryDto)
//     entries: CreateEntryDto[];
// }


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