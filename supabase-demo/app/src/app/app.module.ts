import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { AppRoutingModule } from './app-routing.module';
import { OpenSessionsComponent } from './open-sessions/open-sessions.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { GameSessionState } from './_store/game_session.store';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { TimeagoModule } from 'ngx-timeago';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CreateSessionDialogComponent } from './create-session/create-session-dialog/create-session-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameState } from './_store/game.store';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminComponent } from './admin/admin.component';
import { ArchiveSessionsComponent } from './archive-sessions/archive-sessions.component';
import { AuthorizationRequiredComponent } from './authorization-required/authorization-required.component';
import { LivePollingSessionsComponent } from './live-polling-sessions/live-polling-sessions.component';
@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    OpenSessionsComponent,
    CreateSessionComponent,
    AllSessionsComponent,
    CreateSessionDialogComponent,
    LoginFormComponent,
    AdminComponent,
    ArchiveSessionsComponent,
    AuthorizationRequiredComponent,
    LivePollingSessionsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([GameSessionState, GameState], {
      selectorOptions: {
        injectContainerState: false,
      },
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    TimeagoModule.forRoot(),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  // TODO WIP injectable supabase client
  // providers: [
  //   {
  //     provide: SupabaseClient,
  //     useFactory: () =>
  //       createClient(environment.supabaseUrl, environment.supabaseKey),
  //   },
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
