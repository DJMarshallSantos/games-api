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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile';
import { UpdateProfileDto } from './dto/update-profile';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo perfil.',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os perfis de determinado usuário.' })
  findAll(@LoggedUser() user: User, @Param('userId') id: string) {
    return this.profileService.findAll(id);
  }

  @Get(':profileId')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID.',
  })
  findOne(@LoggedUser() user: User, @Param('profileId') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':profileId')
  @ApiOperation({
    summary: 'Editar um perfil pelo ID.',
  })
  update(
    @LoggedUser() user: User,
    @Param('profileId') id: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.update(id, dto);
  }

  @Delete(':profileId')
  @ApiOperation({
    summary: 'Deletar um perfil pelo ID.',
  })
  delete(@LoggedUser() user: User, @Param('profileId') id: string) {
    return this.profileService.delete(id);
  }
}
