import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSkinxDTO {
  @IsNumber()
  @ApiProperty({ description: 'user id' })
  user_id: number;

  @IsString()
  @ApiProperty({ description: 'data' })
  data: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'skinx id' })
  forkedFrom?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'skinx id' })
  purchasedFrom?: number;
}

export class UpdateSkinxDTO {}
