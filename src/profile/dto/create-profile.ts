import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(3, 12)
  @ApiProperty({
    description: 'Nome do perfil. Mínimo 3 Máximo 12 letras',
    example: 'John Doe',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Foto do perfil. Deve ser uma URL.',
    example:
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
  })
  imageUrl: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do Usuário dono do perfil.',
    example: '8204a6a3-d942-4af3-aa13-06cf51ecd2e6',
  })
  userId: string;
}
