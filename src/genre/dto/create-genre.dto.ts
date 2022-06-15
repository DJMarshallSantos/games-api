import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase, IsString } from 'class-validator';
export class CreateGenreDto {
  @IsString()
  @IsLowercase()
  @ApiProperty({
    description: 'Adicione um um novo gênero',
    example: 'tps',
  })
  name: string;
}
