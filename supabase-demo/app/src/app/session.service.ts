import { Injectable } from '@angular/core';
import { createClient, PostgrestError, PostgrestResponse, SupabaseClient, User } from '@supabase/supabase-js';
import { DateTime, Duration } from 'luxon';
import { environment } from '../environments/environment';
import { ApiGameSession, GameSession, NewSession, SystemMessage } from './interfaces';

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

  // no longer used?
  get openSessions() {
    return this.view
      .match({ status_id: 1 })
      .neq('expires_at', null)
      .gt('expires_at', DateTime.now().toISO());
  }

  get view() {
    return this.supabase.from<ApiGameSession>('v_game_sessions').select();
  }

  // no longer used?
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
    return !!this.supabase.auth.user();
  }

  get loggedInUser(): User | null {
    return this.supabase.auth.user();
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

  // no longer used
  close(game_session_id: number) {
    return this.supabase
      .from<GameSession>('game_session')
      .update({ status_id: 2 })
      .eq('game_session_id', game_session_id);
  }

  // no longer used
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

  update(game_session_id: number, updateBlock: Partial<ApiGameSession>) {
    return this.supabase
      .from<GameSession>('game_session')
      .update(updateBlock)
      .eq('game_session_id', game_session_id);
  }

  async login(email: string, password: string): Promise<AuthorizationResult> {
    const { error } = await this.supabase.auth.signIn({ email, password });
    if (error) {
      return new AuthorizationResult(false, error.message);
    } else {
      return new AuthorizationResult(true);
    }
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    return error;
  }

  async updateSystemMessage(systemMessage: SystemMessage): Promise<PostgrestError | null> {
    const response = await this.supabase
      .from('system_message')
      .update({ message: systemMessage.message, active: systemMessage.active, updated_at: DateTime.now().toISO() })
      .eq('id', 1);
    return response.error;
  }

  async getSystemMessage(): Promise<SystemMessage> {
    const response = await this.supabase
      .from<SystemMessage>('system_message')
      .select('message, active')
      .limit(1)
      .single();
    return response.body || { message: '', active: false } as SystemMessage;
  }
}

export class AuthorizationResult {
  success: boolean;
  errorMessage: string | null;
  constructor(success: boolean, errorMessage: string | null = null) {
    this.success = success;
    this.errorMessage = errorMessage;
  }
}
