import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('signup')
  @Post()
  @ApiOperation({
    summary: 'Criar novo usuário.',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiTags('isAdmin')
  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin - Listar todos os usuários.',
  })
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }

  @ApiTags('isAdmin')
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin - Visualizar um usuário pelo ID.',
  })
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.findOne(id, user);
  }

  @ApiTags('isAdmin')
  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Admin - Deletar conta de usuário por Id .',
  })
  deleteUser(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.deleteUser(id, user);
  }

  @ApiTags('user')
  @Get('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Visualizar informações da conta Logada.',
  })
  myAccount(@LoggedUser() user: User) {
    return this.userService.myAccount(user.id);
  }

  @ApiTags('user')
  @Patch('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar dados da conta logada.',
  })
  update(@LoggedUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @ApiTags('user')
  @Delete('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar conta de usuário que está logada.',
  })
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user.id);
  }
}
