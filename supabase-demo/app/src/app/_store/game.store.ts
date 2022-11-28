import {
  Action,
  Actions,
  NgxsOnInit,
  ofActionDispatched,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { debounceTime, from, map, tap } from 'rxjs';
import { Game } from '../interfaces';
import { GameActions } from './game.actions';
import { insertItem, patch } from '@ngxs/store/operators';
import { handleSingleResponse } from '../error_handling';
import { iif } from '@ngxs/store/operators';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

export interface GameStateModel {
  games: Game[];
  filter: string | undefined;
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    games: [],
    filter: undefined,
  },
})
@Injectable()
export class GameState implements NgxsOnInit {
  private supabase: SupabaseClient;

  constructor(private readonly actions$: Actions) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  ngxsOnInit({ dispatch }: StateContext<GameStateModel>): void {
    this.actions$
      .pipe(ofActionDispatched(GameActions.Search), debounceTime(250))
      .subscribe(({ name }) => dispatch(new GameActions.Filter.Set(name)));
  }

  @Selector()
  static games(state: GameStateModel): Game[] {
    return state.games;
  }

  @Action(GameActions.GetAll)
  getAllGames({ setState, getState }: StateContext<GameStateModel>) {
    const query = this.supabase.from<Game>('game').select().order('name');
    const { filter } = getState();
    if (filter) {
      query.ilike('name', `%${filter}%`);
    }
    return from(query).pipe(
      map((resp) => {
        if (resp.error) {
          alert(resp.error.message);
        }
        return resp?.data || [];
      }),
      tap((games: Game[]) => setState(patch({ games })))
    );
  }

  @Action(GameActions.Filter.Set)
  setFilter(
    { setState, dispatch }: StateContext<GameStateModel>,
    { name }: GameActions.Filter.Set
  ) {
    setState(patch({ filter: name }));
    return dispatch(new GameActions.GetAll());
  }

  @Action(GameActions.Filter.Reset)
  resetFilter({ dispatch }: StateContext<GameStateModel>) {
    return dispatch(new GameActions.Filter.Set(undefined));
  }

  @Action(GameActions.Create)
  createGame(
    { setState }: StateContext<GameStateModel>,
    { name }: GameActions.Create
  ) {
    return from(this.supabase.from<Game>('game').insert({ name })).pipe(
      handleSingleResponse(),
      tap((game) =>
        setState(patch({ games: iif(!!game, insertItem<Game>(game as Game)) }))
      )
    );
  }
}
