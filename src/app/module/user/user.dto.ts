import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'Role' })
  email: string;
}
