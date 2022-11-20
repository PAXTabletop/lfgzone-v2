import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  constructor(readonly sessionService: SessionService) {
    this.sessionService = sessionService
  }

  async logout() {
    const error = await this.sessionService.logout()
    if (error) {
      alert(error.message);
    } else {
      location.reload();
    }
  }
}
