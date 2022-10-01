import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameSession } from '../interfaces';
import { SessionService } from '../session.service';
import { GameSessionActions } from '../_store/game_session.actions';
import { GameSessionState } from '../_store/game_session.store';

@Component({
  selector: 'app-all-sessions',
  styleUrls: ['./all-sessions.component.css'],
  templateUrl: './all-sessions.component.html',
})
export class AllSessionsComponent implements OnInit {
  @Select(GameSessionState.gameSessions) gameSessions$!: Observable<
    GameSession[]
  >;
  @Select(GameSessionState.loading) loading$!: Observable<boolean>;
  displayedColumns: string[] = ['game', 'created_at', 'status'];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GameSessionActions.GetAll(true));
  }

  closeSession(gameSession: GameSession) {
    this.store.dispatch(new GameSessionActions.Close(gameSession));
  }
}
