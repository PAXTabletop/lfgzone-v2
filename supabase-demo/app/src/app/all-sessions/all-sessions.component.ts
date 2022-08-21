import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
})
export class AllSessionsComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  gameSessions: any[] = []

  ngOnInit(): void {
    this.loadGameSessions()
  }

  async loadGameSessions() {
    let { data, error, status } = await this.sessionService.allSessions
    
    console.log(status)
    if (error) {
      alert(error.message)
    } else if(data) {
      this.gameSessions = data
    }
  }

  async closeSession(gameSessionId: number) {
    const result = await this.sessionService.close(gameSessionId)
    console.log(result)
    return this.loadGameSessions()
  }

}
