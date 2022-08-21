import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSessionComponent } from './create-session/create-session.component';
import { LoginComponent } from './login/login.component';
import { OpenSessionsComponent } from './open-sessions/open-sessions.component';

const routes: Routes = [
  { path: '', component: OpenSessionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manage-sessions', component: CreateSessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }