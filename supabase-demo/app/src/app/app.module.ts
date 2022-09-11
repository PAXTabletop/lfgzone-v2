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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OpenSessionsComponent,
    CreateSessionComponent,
    AllSessionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([GameSessionState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
