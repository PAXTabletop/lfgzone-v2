import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Filter, GameSession } from "../interfaces";
import { SessionService } from "../session.service";
import { GameSessionActions } from "./game_session.actions";
import { catchError, from, map, throwError, tap, of, mergeMap } from 'rxjs';
import { patch, updateItem } from '@ngxs/store/operators'
import { Injectable } from "@angular/core";

export interface GameSessionStateModel {
  game_sessions: GameSession[];
  filter: Filter<GameSession>;
}

@State<GameSessionStateModel>({
  name: 'game_session',
  defaults: {
    game_sessions: [],
    filter: {status_id: 1}
  }
})
@Injectable()
export class GameSessionState {

  constructor(private readonly sessionService: SessionService) {}

  @Selector()
  static gameSessions (state: GameSessionStateModel): GameSession[] {
    return state.game_sessions;
  }

  @Action(GameSessionActions.GetAll)
  getAllSessions({setState}: StateContext<GameSessionStateModel>, {ignoreFilter}: GameSessionActions.GetAll) {
    // TODO ignoreFilter implemented later
    return from(this.sessionService.allSessions).pipe(
      map(resp => {
        if (resp.error) {
          alert(resp.error.message);
        }
        return resp.data || [];
      }),
      tap((game_sessions: GameSession[]) => setState(patch({game_sessions})))
    )
  }

  @Action(GameSessionActions.Close)
  closeSession({setState}: StateContext<GameSessionStateModel>, {gameSession}: GameSessionActions.Close) {
    if(gameSession.game_session_id) {
      return from(this.sessionService.close(gameSession.game_session_id)).pipe(
        map(resp => {
          if (resp.error) {
            alert(resp.error.message);
          }
          return resp.data?.[0] || undefined
        }),
        tap(updatedGameSession => {
          console.log(updatedGameSession)
          if(updatedGameSession) {
            setState(patch<GameSessionStateModel>({
              game_sessions: updateItem<GameSession>((gs) => {
                return gs?.game_session_id === updatedGameSession.game_session_id
              }, updatedGameSession )
            }))
          }
        }),
      );
    }
    return;
  }



}
