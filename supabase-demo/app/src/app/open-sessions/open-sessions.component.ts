import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'

@Component({
  selector: 'app-open-sessions',
  templateUrl: './open-sessions.component.html',
})
export class OpenSessionsComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  gameSessions: any[] = []
  refreshInterval = 5000

  ngOnInit(): void {
    this.loadGameSessions()
    window.setInterval(() => this.loadGameSessions(), this.refreshInterval)
  }

  async loadGameSessions() {
    let { data, error, status } = await this.sessionService.openSessions
    
    console.log(status)
    if (error) {
      alert(error.message)
    } else if(data) {
      this.gameSessions = data
    }
  }

  

}
