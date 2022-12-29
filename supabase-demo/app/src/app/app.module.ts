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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AdminComponent } from './admin/admin.component';
import { ArchiveSessionsComponent } from './archive-sessions/archive-sessions.component';
import { AuthorizationRequiredComponent } from './authorization-required/authorization-required.component';
import { LivePollingSessionsComponent } from './live-polling-sessions/live-polling-sessions.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { SystemMessageComponent } from './system-message/system-message.component';
import { SystemMessageManagementComponent } from './system-message/system-message-management/system-message-management.component';
import { EventState } from './_store/event.store';
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
    InfoDialogComponent,
    SystemMessageComponent,
    SystemMessageManagementComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([GameSessionState, GameState, EventState], {
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
    MatCheckboxModule,
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
