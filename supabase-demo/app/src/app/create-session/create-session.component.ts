import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { NewSession } from '../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { CreateSessionDialogComponent } from './create-session-dialog/create-session-dialog.component';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
})
export class CreateSessionComponent {
  private supabase: SupabaseClient;
  loggedIn = false;

  constructor(
    private sessionService: SessionService,
    private readonly dialog: MatDialog
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.loggedIn = !!this.supabase.auth.user();
  }

  async createSession() {
    const dialogRef = this.dialog.open(CreateSessionDialogComponent, {
      minWidth: '250px',
    });
  }
}
