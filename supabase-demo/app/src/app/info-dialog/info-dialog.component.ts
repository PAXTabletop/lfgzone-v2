import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateSessionDialogComponent } from '../create-session/create-session-dialog/create-session-dialog.component';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css'],
})
export class InfoDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateSessionDialogComponent>) {}
}
