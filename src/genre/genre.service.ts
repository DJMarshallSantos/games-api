import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { dataTreatment } from 'src/utils/data-treatment';
import { handleError } from 'src/utils/handle-error';
import { isAdmin } from 'src/utils/is-admin';
import { notFoundError } from 'src/utils/not-found';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto, user: User): Promise<Genre> {
    isAdmin(user);
    const data: Prisma.GenreCreateInput = { name: dto.name };

    data.name = await dataTreatment(data.name);

    return this.prisma.genre.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Genre[]> {
    const list = await this.prisma.genre.findMany();

    if (list.length === 0) {
      throw new NotFoundException(
        'Não existem gêneros cadastrados. Que tal cadastrar o primeiro?',
      );
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.genre.findUnique({ where: { id } });

    notFoundError(record, id);

    return record;
  }

  async update(id: string, dto: UpdateGenreDto, user: User): Promise<Genre> {
    isAdmin(user);
    await this.findOne(id);

    const data: Partial<Genre> = { ...dto };

    data.name = await dataTreatment(data.name);

    return this.prisma.genre
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string, user: User) {
    isAdmin(user);
    await this.findOne(id);

    await this.prisma.genre.delete({
      where: { id },
    });
    throw new HttpException('Genero deletado com sucesso', 204);
  }
}
