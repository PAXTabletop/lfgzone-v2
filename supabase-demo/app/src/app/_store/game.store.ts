import { Action, Selector, State, StateContext } from '@ngxs/store';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, map, tap } from 'rxjs';
import { Game } from '../interfaces';
import { GameActions } from './game.actions';
import { insertItem, patch } from '@ngxs/store/operators';
import { handleSingleResponse } from '../error_handling';
import { iif } from '@ngxs/store/operators';
import { environment } from 'src/environments/environment';

export interface GameStateModel {
  games: Game[];
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    games: [],
  },
})
export class GameState {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  @Selector()
  static games(state: GameStateModel): Game[] {
    return state.games;
  }

  @Action(GameActions.GetAll)
  getAllGames({ setState }: StateContext<GameStateModel>) {
    return from(this.supabase.from<Game>('game')).pipe(
      map((resp) => {
        if (resp.error) {
          alert(resp.error.message);
        }
        return resp?.data || [];
      }),
      tap((games: Game[]) => setState(patch({ games })))
    );
  }

  @Action(GameActions.Create)
  createGame(
    { setState }: StateContext<GameStateModel>,
    { name }: GameActions.Create
  ) {
    console.log('i get here');
    return from(this.supabase.from<Game>('game').insert({ name })).pipe(
      handleSingleResponse(),
      tap((game) =>
        setState(patch({ games: iif(!!game, insertItem<Game>(game as Game)) }))
      )
    );
  }
}
