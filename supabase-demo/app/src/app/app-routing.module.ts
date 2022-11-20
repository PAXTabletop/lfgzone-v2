import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ArchiveSessionsComponent } from './archive-sessions/archive-sessions.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { OpenSessionsComponent } from './open-sessions/open-sessions.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'open-sessions', component: OpenSessionsComponent },
      { path: 'manage-sessions', component: CreateSessionComponent },
      { path: 'archive-sessions', component: ArchiveSessionsComponent },
      { path: '', redirectTo: 'manage-sessions', pathMatch: 'full' },
    ],
  },
  { path: '', component: OpenSessionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
