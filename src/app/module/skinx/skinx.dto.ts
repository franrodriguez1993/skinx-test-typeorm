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
  forked_from?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'skinx id' })
  purchased_from?: number;
}

export class UpdateSkinxDTO {}
