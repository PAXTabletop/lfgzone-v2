import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameSession } from '../interfaces';
import { SessionService } from '../session.service';
import { GameActions } from '../_store/game.actions';
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
  displayedColumns: string[] = [
    'game',
    'created_at',
    'location',
    'filled_seats',
    'total_seats',
    'status',
  ];

  constructor(
    private readonly store: Store,
    private readonly liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GameSessionActions.GetAll(true));
    this.store.dispatch(new GameActions.GetAll());
  }

  closeSession(gameSession: GameSession) {
    this.store.dispatch(new GameSessionActions.Close(gameSession));
  }

  sort(sort: Sort) {
    this.store.dispatch(new GameSessionActions.Sort.Set(sort));
    // announces for accessibility
    this.liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
  }
}
