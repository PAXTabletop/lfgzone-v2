import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { map, Observable, mergeMap, Subscription } from 'rxjs';
import { EventState } from 'src/app/_store/event.store';
import { GameActions } from 'src/app/_store/game.actions';
import { Game, NewSession } from '../../interfaces';
import { GameState } from '../../_store/game.store';
import { GameSessionActions } from '../../_store/game_session.actions';

@Component({
  selector: 'app-create-session-dialog',
  templateUrl: './create-session-dialog.component.html',
  styleUrls: ['./create-session-dialog.component.css'],
})
export class CreateSessionDialogComponent implements OnInit, OnDestroy {
  @Select(GameState.games) games$!: Observable<Game[]>;
  step = 0;
  gameName: string = '';
  subscriptions = new Subscription();
  createForm = this.fb.group({
    game_id: this.fb.nonNullable.control<number>(-1, Validators.required),
    event_id: this.fb.nonNullable.control(2, Validators.required),
    status_id: this.fb.nonNullable.control(1, Validators.required),
    filled_seats: this.fb.nonNullable.control(1, Validators.required),
    total_seats: this.fb.nonNullable.control(4, Validators.required),
    location: this.fb.control(''),
  });

  gameControl = this.fb.control<string | Game>('');

  get gameIdControl() {
    return this.createForm.get('game_id') as FormControl;
  }

  constructor(
    public dialogRef: MatDialogRef<CreateSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.step = 0;
    this.subscriptions.add(
      this.gameControl.valueChanges.subscribe((gameControlValue) => {
        const name =
          typeof gameControlValue === 'string'
            ? gameControlValue || ''
            : gameControlValue?.name;
        this.store.dispatch(new GameActions.Search(name));
      })
    );
    this.subscriptions.add(
      this.dialogRef.beforeClosed().subscribe(() => {
        this.store.dispatch(new GameActions.Filter.Reset());
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  gameDisplayFn(game: Game | string) {
    return typeof game === 'string' ? game : game.name;
  }

  createSession() {
    // TODO set this somewhere useful instead of here
    const event_id =
      this.store.selectSnapshot(EventState.current)?.event_id ||
      this.createForm.value.event_id;
    this.store.dispatch(
      new GameSessionActions.Create({
        ...this.createForm.value,
        event_id,
      } as NewSession)
    );
  }

  nextStep() {
    if (typeof this.gameControl.value === 'string') {
      const newGameName = this.gameControl.value;
      this.gameName = newGameName;
      this.subscriptions.add(
        this.store
          .dispatch(new GameActions.Create(newGameName))
          .pipe(
            mergeMap(() => this.games$),
            map((games) => games.find((g) => g.name === newGameName))
          )
          .subscribe((newGame) => {
            if (newGame?.game_id)
              this.createForm.patchValue({ game_id: newGame.game_id });
          })
      );
    } else if (this.gameControl.value) {
      const game: Game = this.gameControl.value;
      this.gameName = game.name;
      this.gameIdControl.setValue(game.game_id);
    }
    this.step = 1;
  }
}
