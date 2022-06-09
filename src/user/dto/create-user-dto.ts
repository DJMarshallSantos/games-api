import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, MinLength, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(3, 20)
  @ApiProperty({
    description: 'O nome do usuário com no mínimo 3 e máximo 20 caracteres.',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário para login.',
    example: 'jhon_doe@gmail.com',
  })
  email: string;

  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  @ApiProperty({
    description:
      'Senha do usuário para login. Tem que conter letras maiúsculas e minúsculas, número e caracter especial.',
    example: 'JonDoe@1234',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha.',
    example: 'JonDoe@1234',
  })
  confirmPassword: string;

  @Length(11, 11)
  @Matches(/^[0-9]*$/, {
    message: 'CPF inválido.',
  })
  @ApiProperty({
    description: 'CPF do usuário, somente números.',
    example: '15676482950',
  })
  cpf: string;

  @ApiProperty({
    description: 'Autenticação de administrador.',
    example: false,
  })
  isAdmin: boolean;
}
