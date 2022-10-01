import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
import { MatCommonModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OpenSessionsComponent,
    CreateSessionComponent,
    AllSessionsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([GameSessionState], {
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
