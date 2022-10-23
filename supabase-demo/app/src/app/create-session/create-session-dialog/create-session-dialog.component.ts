import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { GameSessionActions } from 'src/app/_store/game_session.actions';

@Component({
  selector: 'app-create-session-dialog',
  templateUrl: './create-session-dialog.component.html',
  styleUrls: ['./create-session-dialog.component.css'],
})
export class CreateSessionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly store: Store
  ) {}

  createSession() {
    this.store.dispatch(
      new GameSessionActions.Create({ event_id: 1, status_id: 1, game_id: 1 })
    );
  }
}
