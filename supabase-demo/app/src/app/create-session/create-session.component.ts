import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSessionDialogComponent } from './create-session-dialog/create-session-dialog.component';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
})
export class CreateSessionComponent {
  constructor(
    readonly sessionService: SessionService,
    private readonly dialog: MatDialog
  ) {}

  async createSession() {
    const dialogRef = this.dialog.open(CreateSessionDialogComponent, {
      minWidth: '250px',
    });
  }
}
