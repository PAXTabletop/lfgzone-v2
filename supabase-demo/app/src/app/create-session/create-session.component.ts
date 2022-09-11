import { Component, OnInit } from '@angular/core';
import { SessionService} from '../session.service'
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { NewSession } from '../interfaces';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html'
})
export class CreateSessionComponent implements OnInit {
  private supabase: SupabaseClient
  loggedIn = false

  constructor(private sessionService: SessionService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    )

    this.loggedIn = !!this.supabase.auth.user()
  }

  ngOnInit(): void {}

  async createSession() {
    const game_id = Math.floor(Math.random() * 3) + 1
    const newSession: NewSession = { event_id: 1, game_id,  status_id: 1}

    try {
      const { error } = await this.sessionService.create(newSession)
      if (error) {
        alert(error.message)
      } else {
        location.reload() // being lazy
      }
    } catch (error: any) {
      alert(error.message)
    }

  }

}
