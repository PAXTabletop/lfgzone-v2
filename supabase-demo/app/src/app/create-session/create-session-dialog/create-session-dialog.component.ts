import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game, NewSession } from 'src/app/interfaces';
import { GameState } from 'src/app/_store/game.store';
import { GameSessionActions } from 'src/app/_store/game_session.actions';

@Component({
  selector: 'app-create-session-dialog',
  templateUrl: './create-session-dialog.component.html',
  styleUrls: ['./create-session-dialog.component.css'],
})
export class CreateSessionDialogComponent {
  @Select(GameState.games) games$!: Observable<Game[]>;
  createForm = this.fb.group({
    game_id: this.fb.nonNullable.control<number>(-1, Validators.required),
    event_id: this.fb.nonNullable.control(1, Validators.required),
    status_id: this.fb.nonNullable.control(1, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  createSession() {
    this.store.dispatch(
      new GameSessionActions.Create(this.createForm.value as NewSession)
    );
  }
}