import { GameSessionActions } from '../_store/game_session.actions';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.css'],
})
export class RefreshButtonComponent {

  constructor(private store: Store) {}

  refresh() {
    this.store.dispatch(new GameSessionActions.Refresh());
  }
}