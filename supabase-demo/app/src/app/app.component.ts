import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { Event } from './interfaces';
import { EventActions } from './_store/event.actions';
import { EventState } from './_store/event.store';
import { GameSessionActions } from './_store/game_session.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(EventState.current) currentEvent$!: Observable<Event | undefined>;
  subscriptions = new Subscription();

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new EventActions.GetAll());
    this.subscriptions.add(
      this.currentEvent$.subscribe(() => {
        this.store.dispatch(new GameSessionActions.Refresh());
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  infoDialog() {
    this.dialog.open(InfoDialogComponent);
  }
}
