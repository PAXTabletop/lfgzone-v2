import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { GameSession, NewSession } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get openSessions() {
    return this.allSessions.match({ status_id: 1 });
  }

  get allSessions() {
    return this.supabase.from<GameSession>('game_session').select(`
        game_session_id,
        event:event_id (
          event_id,
          name
        ),
        game:game_id (
          game_id,
          name
        ),
        status:status_id (
          status_id,
          name
        ),
        created_at`);
  }

  create(gameSession: NewSession) {
    const create = {
      ...gameSession,
    };
    return this.supabase.from('game_session').insert(create);
  }

  get(game_session_id: number) {
    return this.supabase
      .from<GameSession>('game_session')
      .select(
        `
        game_session_id,
        event:event_id (
          event_id,
          name
        ),
        game:game_id (
          game_id,
          name
        ),
        status:status_id (
          status_id,
          name
        ),
        created_at`
      )
      .eq('game_session_id', game_session_id);
  }

  close(game_session_id: number) {
    return this.supabase
      .from<GameSession>('game_session')
      .update({ status_id: 2 })
      .eq('game_session_id', game_session_id);
  }
}
