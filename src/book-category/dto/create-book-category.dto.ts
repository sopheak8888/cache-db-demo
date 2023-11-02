import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateBookCategoryDto {
  @ApiProperty({ example: 'name' })
  @IsString()
  @Length(1, 50)
  name: string;
}
