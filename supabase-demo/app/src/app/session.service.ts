import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DateTime, Duration } from 'luxon';
import { environment } from '../environments/environment';
import { ApiGameSession, GameSession, NewSession } from './interfaces';

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
    return this.view
      .match({ status_id: 1 })
      .neq('expires_at', null)
      .gt('expires_at', DateTime.now().toISO());
  }

  get view() {
    return this.supabase.from<ApiGameSession>('v_game_sessions').select();
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
        created_at, expires_at, location, total_seats, filled_seats`);
  }

  get loggedIn() {
    return !!this.supabase.auth.user()
  }

  create(gameSession: NewSession) {
    const create = {
      ...gameSession,
      expires_at: DateTime.now()
        .plus(Duration.fromObject({ minutes: 20 }))
        .toISO(),
    };
    return this.supabase.from<GameSession>('game_session').insert(create);
  }

  get(game_session_id: number) {
    return this.supabase
      .from<GameSession>('v_game_sessions')
      .select()
      .eq('game_session_id', game_session_id);
  }

  close(game_session_id: number) {
    return this.supabase
      .from<GameSession>('game_session')
      .update({ status_id: 2 })
      .eq('game_session_id', game_session_id);
  }

  extend(game_session_id: number) {
    return this.supabase
      .from<GameSession>('game_session')
      .update({
        expires_at: DateTime.now()
          .plus(Duration.fromObject({ minutes: 20 }))
          .toISO(),
      })
      .eq('game_session_id', game_session_id);
  }

  async login(email: string, password: string): Promise<AuthorizationResult> {
    const { error } = await this.supabase.auth.signIn({email, password})
    if (error) {
      return new AuthorizationResult(false, error.message)
    } else {
      return new AuthorizationResult(true)
    }
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    return error
  }
}

export class AuthorizationResult {
  success:boolean
  errorMessage: string | null
  constructor(success: boolean, errorMessage: string | null = null) {
    this.success = success
    this.errorMessage = errorMessage
  }
}