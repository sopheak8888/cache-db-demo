import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, Length, Max } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'title' })
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  @Length(1, 50)
  description: string;

  @ApiProperty({ example: '1.2' })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Max(99999999)
  price: number;
}
