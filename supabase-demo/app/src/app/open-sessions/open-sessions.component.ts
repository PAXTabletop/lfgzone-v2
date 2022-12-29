import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { GameSession } from '../interfaces';
import { SystemMessageComponent } from '../system-message/system-message.component';
import { EventState } from '../_store/event.store';
import { GameSessionActions } from '../_store/game_session.actions';
import { GameSessionState } from '../_store/game_session.store';

@Component({
  selector: 'app-open-sessions',
  templateUrl: './open-sessions.component.html',
  styleUrls: ['./open-sessions.component.css'],
})
export class OpenSessionsComponent implements OnInit, OnDestroy {
  @Select(GameSessionState.gameSessions) gameSessions$!: Observable<
    GameSession[]
  >;
  @Select(GameSessionState.loading) loading$!: Observable<boolean>;
  @Select(EventState.currentLocation)
  currentEventLocation$!: Observable<string>;
  @ViewChild(SystemMessageComponent)
  private systemMessage!: SystemMessageComponent;

  constructor(private store: Store) {}
  @Input() refreshInterval = 0;
  interval?: number;
  noSessions$?: Observable<boolean>;

  ngOnInit(): void {
    this.store.dispatch(new GameSessionActions.Filter.OpenSessions());
    if (this.refreshInterval) {
      this.interval = window.setInterval(
        () => this.store.dispatch(new GameSessionActions.Refresh()),
        this.refreshInterval
      );
    }
    this.noSessions$ = this.gameSessions$.pipe(
      map((gameSessions) => gameSessions.length === 0)
    );
  }

  ngOnDestroy(): void {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  refresh() {
    this.store.dispatch(new GameSessionActions.Refresh());
    this.systemMessage.loadData();
  }
}
