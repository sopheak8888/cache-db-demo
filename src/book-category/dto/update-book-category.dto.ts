import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateBookCategoryDto {
  @ApiProperty({ example: 'name' })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name: string;
}
