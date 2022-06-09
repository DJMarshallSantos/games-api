import { Game } from 'src/game/entities/game-entity';

export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  userId: string;
  games?: Game[];
}
