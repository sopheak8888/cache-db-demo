import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';

export class FindAllBookCategoryDto {
  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  search_by?: string = '';

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  from_date?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  to_date: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(100000)
  page: number = 1;

  @ApiPropertyOptional({ example: '10' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(100)
  limit: number = 10;
}
