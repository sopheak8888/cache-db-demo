import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ example: 'title' })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: '1.3' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  @Max(99999999)
  price: number;

  @ApiProperty({ example: '1' })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  @Max(100000)
  category_id: number;
}
