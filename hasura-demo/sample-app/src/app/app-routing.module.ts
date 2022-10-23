import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSessionsComponent } from './all-sessions/all-sessions.component';
import { OpenSessionsComponent } from './open-sessions/open-sessions.component';
import { AddSessionComponent } from './add-session/add-session.component';

const routes: Routes = [
  { path: '', component: OpenSessionsComponent },
  { path: 'add', component: AddSessionComponent },
  { path: 'all', component: AllSessionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
