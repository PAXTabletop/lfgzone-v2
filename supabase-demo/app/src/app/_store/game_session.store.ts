import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Filter, GameSession } from '../interfaces';
import { SessionService } from '../session.service';
import { GameSessionActions } from './game_session.actions';
import { finalize, from, map, tap } from 'rxjs';
import { iif, patch, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';

export interface GameSessionStateModel {
  game_sessions: GameSession[];
  filter: Filter<GameSession>;
  loading: boolean;
}

@State<GameSessionStateModel>({
  name: 'game_session',
  defaults: {
    game_sessions: [],
    filter: { status_id: 1 },
    loading: false,
  },
})
@Injectable()
export class GameSessionState {
  constructor(private readonly sessionService: SessionService) {}

  @Selector()
  static gameSessions(state: GameSessionStateModel): GameSession[] {
    return state.loading ? [] : state.game_sessions;
  }

  @Selector()
  static loading(state: GameSessionStateModel): boolean {
    return state.loading;
  }

  @Action(GameSessionActions.GetAll)
  getAllSessions(
    { getState, setState }: StateContext<GameSessionStateModel>,
    { ignoreFilter }: GameSessionActions.GetAll
  ) {
    setState(patch({ loading: true }));
    const query = this.sessionService.allSessions;
    if (!ignoreFilter) {
      query.match(getState().filter);
    }
    return from(query).pipe(
      map((resp) => {
        if (resp.error) {
          alert(resp.error.message);
        }
        return resp.data || [];
      }),
      tap((game_sessions: GameSession[]) => setState(patch({ game_sessions }))),
      finalize(() => setState(patch({ loading: false })))
    );
  }

  @Action(GameSessionActions.Get)
  getSession(
    { setState }: StateContext<GameSessionStateModel>,
    { game_session_id }: GameSessionActions.Get
  ) {
    return from(this.sessionService.get(game_session_id)).pipe(
      map((resp) => {
        if (resp.error) {
          alert(resp.error.message);
        }
        return resp?.data?.[0];
      }),
      tap((game_session?: GameSession) => {
        setState(
          patch({
            game_sessions: iif(
              () => !!game_session,
              updateItem<GameSession>(
                (gs) => gs?.game_session_id === game_session_id,
                game_session as GameSession
              )
            ),
          })
        );
      })
    );
  }

  @Action(GameSessionActions.Close)
  closeSession(
    { dispatch }: StateContext<GameSessionStateModel>,
    { gameSession }: GameSessionActions.Close
  ) {
    if (gameSession.game_session_id) {
      return from(this.sessionService.close(gameSession.game_session_id)).pipe(
        map((resp) => {
          if (resp.error) {
            alert(resp.error.message);
          }
          return resp.data?.[0] || undefined;
        }),
        tap((updatedGameSession) => {
          if (updatedGameSession?.game_session_id) {
            dispatch(
              new GameSessionActions.Get(updatedGameSession.game_session_id)
            );
          }
        })
      );
    }
    return;
  }

  @Action(GameSessionActions.Filter.Set)
  setFilter(
    { setState, dispatch }: StateContext<GameSessionStateModel>,
    { filter }: GameSessionActions.Filter.Set
  ) {
    setState(patch({ filter }));
    return dispatch(new GameSessionActions.GetAll());
  }

  @Action(GameSessionActions.Filter.OpenSessions)
  setOpenFilter({ dispatch }: StateContext<GameSessionStateModel>) {
    const filter: Filter<GameSession> = { status_id: 1 };
    return dispatch(new GameSessionActions.Filter.Set(filter));
  }
}
