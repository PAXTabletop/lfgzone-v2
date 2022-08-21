import { Injectable } from '@angular/core'
import {
  createClient,
  SupabaseClient
} from '@supabase/supabase-js'
import { environment } from '../environments/environment'

export interface NewSession {
  event_id: number
  game_id: number
  status_id: number
}

export interface GameSession {
  game_session_id: number
  event_id: number
  game_id: number
  status_id: number
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )
  }

  get openSessions() {
    return this.supabase
      .from('game_session')
      .select(`
        game_session_id,
        event:event_id (
          name
        ),
        game:game_id (
          name
        ),
        created_at`)
      .eq('status_id', 1)
  }

  get allSessions() {
    return this.supabase
      .from('game_session')
      .select(`
        game_session_id,
        event:event_id (
          name
        ),
        game:game_id (
          name
        ),
        status:status_id (
          name
        ),
        created_at`)
  }

  create(gameSession: NewSession) {
    const create = {
      ...gameSession,
    }

    return this.supabase.from('game_session').insert(create, {
      returning: 'minimal', // Don't return the value after inserting
    })
  }

  close(game_session_id: number) {
    return this.supabase
      .from('game_session')
      .update({status_id: 2 })
      .eq('game_session_id', game_session_id);
  }

}