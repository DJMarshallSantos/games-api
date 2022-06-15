import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo.',
    example: 'Halo 5 - Guardians',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem para capa do jogo, em URL',
    example:
      'https://cdn.awsli.com.br/800x800/241/241991/produto/7315822/jogo-halo-5-guardians-xbox-one-764bc0f0.jpg',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo.',
    example:
      'Um jogo de tiro em primeira pessoa, parte da franquia Halo e sequência de Halo 4. Halo 5: Guardians foi produzido pela 343 Industries e publicado pela Microsoft Studios exclusivamente para o Xbox One.',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do jogo.',
    example: 2015,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Score no IMDB',
    example: 7.2,
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do Jogo.',
    example: 'https://youtu.be/Rh_NXwqFvHc',
  })
  trailerYouTubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay do Jogo.',
    example: 'https://youtu.be/CX8OJif2RD0',
  })
  gameplayYouTubeUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Genero dos jogos',
    example: 'fts',
  })
  genres: string;
}
