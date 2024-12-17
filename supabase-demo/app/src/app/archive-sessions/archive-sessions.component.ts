import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GameSessionActions } from '../_store/game_session.actions';

@Component({
  selector: 'app-archive-sessions',
  templateUrl: './archive-sessions.component.html',
  styleUrls: ['./archive-sessions.component.css'],
})
export class ArchiveSessionsComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GameSessionActions.Filter.ArchiveSessions());
  }

  refresh() {
    this.store.dispatch(new GameSessionActions.Refresh());
  }
}
