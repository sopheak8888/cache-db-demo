import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length, Max } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ example: 'title' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  title: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  description: string;

  @ApiProperty({ example: '1.3' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  @Max(99999999)
  price: number;
}
