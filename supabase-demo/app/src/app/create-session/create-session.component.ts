import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateSessionDialogComponent } from './create-session-dialog/create-session-dialog.component';
import { Store } from '@ngxs/store';
import { GameActions } from '../_store/game.actions';
import { GameSessionActions } from '../_store/game_session.actions';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
})
export class CreateSessionComponent implements OnInit {
  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch([
      new GameSessionActions.Filter.ManageSessions(),
      new GameActions.GetAll(),
    ]);
  }

  async createSession() {
    const dialogRef = this.dialog.open(CreateSessionDialogComponent, {
      minWidth: '250px',
    });
  }
}
