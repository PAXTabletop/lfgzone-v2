import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ApiGameSession,
  apiToGameSession,
  Filter,
  GameSession,
} from '../interfaces';
import { SessionService } from '../session.service';
import { GameSessionActions } from './game_session.actions';
import { finalize, from, map, mergeMap, of, tap } from 'rxjs';
import { iif, patch, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { handleListResponse, handleSingleResponse } from '../error_handling';
import { DateTime } from 'luxon';

export interface GameSessionStateModel {
  game_sessions: GameSession[];
  filter: Filter<GameSession>;
  sort: [keyof ApiGameSession, { ascending: boolean; foreignTable?: string }];
  loading: boolean;
}

const defaultFilterSort: Pick<GameSessionStateModel, 'filter' | 'sort'> = {
  filter: {
    match: { status_id: 1 },
    gt: { expires_at: DateTime.now().toISO() },
  },
  sort: ['created_at', { ascending: true }],
};

@State<GameSessionStateModel>({
  name: 'game_session',
  defaults: {
    ...defaultFilterSort,
    game_sessions: [],
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

  @Selector()
  static sort(state: GameSessionStateModel): GameSessionStateModel['sort'] {
    return state.sort;
  }

  @Selector([GameSessionState.sort])
  static tableSort(sort: GameSessionStateModel['sort']): Sort {
    const active = `${sort[1].foreignTable ? `${sort[1].foreignTable}.` : ''}${
      sort[0]
    }`;
    return {
      active,
      direction: sort[1].ascending ? 'asc' : 'desc',
    };
  }

  @Action(GameSessionActions.GetAll)
  getAllSessions(
    { setState, dispatch }: StateContext<GameSessionStateModel>,
    { ignoreFilter }: GameSessionActions.GetAll
  ) {
    setState(patch({ loading: true }));
    return dispatch(new GameSessionActions.Refresh(ignoreFilter)).pipe(
      finalize(() => setState(patch({ loading: false })))
    );
  }

  @Action(GameSessionActions.Refresh)
  refreshSessions(
    { getState, setState }: StateContext<GameSessionStateModel>,
    { ignoreFilter }: GameSessionActions.Refresh
  ) {
    // this is a lot like getall but it doesn't reload, just updates
    const { filter, sort } = getState();
    const query = this.sessionService.view.order(...sort);
    if (!ignoreFilter) {
      if (filter.match) {
        query.match(filter.match);
      }
      if (filter.neq) {
        Object.entries(filter.neq).map(([k, v]) =>
          query.neq(
            k as keyof ApiGameSession,
            // Types are silly. do this better later.
            v as string | number | null | undefined
          )
        );
      }
      if (filter.gt) {
        Object.entries(filter.gt).map(([k, v]) =>
          query.gt(
            k as keyof ApiGameSession,
            // Types are silly. do this better later.
            v as string | number | null | undefined
          )
        );
      }
    }
    return from(query).pipe(
      handleListResponse(),
      map((sessions) => sessions.map(apiToGameSession)),
      tap((game_sessions: GameSession[]) => setState(patch({ game_sessions })))
    );
  }

  @Action(GameSessionActions.Get)
  getSession(
    { setState }: StateContext<GameSessionStateModel>,
    { game_session_id }: GameSessionActions.Get
  ) {
    return from(this.sessionService.get(game_session_id)).pipe(
      handleSingleResponse(),
      tap((game_session?: ApiGameSession) => {
        setState(
          patch({
            game_sessions: iif(
              () => !!game_session,
              updateItem<ApiGameSession>(
                (gs) => gs?.game_session_id === game_session_id,
                apiToGameSession(game_session as ApiGameSession)
              )
            ),
          })
        );
      })
    );
  }

  @Action(GameSessionActions.Create)
  createSession(
    { dispatch }: StateContext<GameSessionStateModel>,
    { gameSession }: GameSessionActions.Create
  ) {
    return from(this.sessionService.create(gameSession)).pipe(
      handleSingleResponse(),
      mergeMap(() => dispatch(new GameSessionActions.Refresh(true)))
    );
  }

  @Action(GameSessionActions.Close)
  closeSession(
    { dispatch }: StateContext<GameSessionStateModel>,
    { gameSession }: GameSessionActions.Close
  ) {
    if (gameSession.game_session_id) {
      return from(this.sessionService.close(gameSession.game_session_id)).pipe(
        handleSingleResponse(),
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

  @Action(GameSessionActions.Extend)
  extendSession(
    { dispatch }: StateContext<GameSessionStateModel>,
    { gameSession }: GameSessionActions.Close
  ) {
    if (gameSession.game_session_id) {
      return from(this.sessionService.extend(gameSession.game_session_id)).pipe(
        handleSingleResponse(),
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
  setOpenFilter({ setState, dispatch }: StateContext<GameSessionStateModel>) {
    setState(patch(defaultFilterSort));
    return dispatch(new GameSessionActions.GetAll());
  }

  @Action(GameSessionActions.Sort.Set)
  setSort(
    { setState, dispatch }: StateContext<GameSessionStateModel>,
    { sort }: GameSessionActions.Sort.Set
  ) {
    // UGH it doesn't let you actually use foreigntable... :(
    // maybe this code will become relevant some day
    let [foreignTable, active] = sort.active.split('.');
    if (!active) {
      active = foreignTable;
      foreignTable = '';
    }
    const internalSort: GameSessionStateModel['sort'] = [
      // hmm this is technically a wrong type with foreignTable around...
      active as keyof ApiGameSession,
      { ascending: sort.direction === 'asc' },
    ];
    if (foreignTable) {
      internalSort[1] = { ...internalSort[1], foreignTable };
    }

    setState(patch({ sort: internalSort }));
    return dispatch(new GameSessionActions.Refresh(true));
  }
}
