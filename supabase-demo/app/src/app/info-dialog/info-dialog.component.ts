import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CreateSessionDialogComponent } from '../create-session/create-session-dialog/create-session-dialog.component';
import { EventState } from '../_store/event.store';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent {
  @Select(EventState.currentLocation)
  currentEventLocation$!: Observable<string>;

  constructor(public dialogRef: MatDialogRef<CreateSessionDialogComponent>) {}
}
