import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameSession } from '../interfaces';
import { SessionService } from '../session.service'
import { GameSessionActions } from '../_store/game_session.actions';
import { GameSessionState } from '../_store/game_session.store';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
})
export class AllSessionsComponent implements OnInit {
  @Select(GameSessionState.gameSessions) gameSessions$!: Observable<GameSession[]>;

  constructor(private readonly store: Store) { }

  gameSessions: any[] = []

  ngOnInit(): void {
    this.store.dispatch(new GameSessionActions.GetAll())
  }

  closeSession(gameSession: GameSession) {
    this.store.dispatch(new GameSessionActions.Close(gameSession));
  }

}
