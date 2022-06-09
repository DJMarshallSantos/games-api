import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Game } from './entities/game-entity';
import { Prisma } from '@prisma/client';
import { handleError } from '../utils/handle-error';
import { notFoundError } from 'src/utils/not-found';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    const data: Prisma.GameCreateInput = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYouTubeUrl: dto.trailerYouTubeUrl,
      gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
      genres: {
        connectOrCreate: {
          create: { name: dto.genres },
          where: { name: dto.genres },
        },
      },
    };

    return await this.prisma.game.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Game[]> {
    const list = await this.prisma.game.findMany();

    if (list.length === 0) {
      throw new NotFoundException(
        'Não existem jogos cadastrados. Quer cadastrar o seu jogo favorito?',
      );
    }
    return list;
  }

  async findOne(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    notFoundError(record, id);
    return record;
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findOne(id);

    const data = { ...dto };

    return this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.game.delete({
      where: { id },
    });
    throw new HttpException('Jogo deletado com sucesso', 204);
  }
}