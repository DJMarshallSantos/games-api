import { Game } from '../../game/entities/game-entity';
import { Profile } from '../../profile/entities/profile.entity';
export class ProfileGame {
  gameId: Game;
  profileId: Profile;
  isFavorite: boolean;
}
