import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileGameService } from './profile-games.service';
import { CreateProfileGameDto } from './dto/create-profile-game';
import { UpdateProfileGameDto } from './dto/update-profile-game';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('profile-games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller()
export class ProfileGameController {
  constructor(private readonly profileGameService: ProfileGameService) {}

  @Post('/profile/games')
  @ApiOperation({
    summary: 'Adicionar jogo a um determinado Perfil (addGame).',
  })
  create(@Body() dto: CreateProfileGameDto) {
    return this.profileGameService.addGame(dto);
  }

  @ApiTags('homepage')
  @Get('homepage/:profileId')
  @ApiOperation({
    summary: 'Lista de Jogos de determinado perfil com genero e favoritos.',
  })
  findOne(@LoggedUser() user: User, @Param('profileId') id: string) {
    return this.profileGameService.findOneProfile(id);
  }

  @Patch('profile/games/:profileGameId')
  @ApiOperation({
    summary: 'Favoritar ou desfavoritar um jogo. Usar Id do addGame. ',
  })
  update(
    @Param('profileGameId') id: string,
    @Body() dto: UpdateProfileGameDto,
  ) {
    return this.profileGameService.updateFav(id, dto);
  }

  @Delete('profile/games/:profileGameId')
  @ApiOperation({
    summary: 'Remover jogo de um determinado Perfil. Usar Id do addGame.',
  })
  delete(@Param('profileGameId') id: string) {
    return this.profileGameService.delete(id);
  }
}
