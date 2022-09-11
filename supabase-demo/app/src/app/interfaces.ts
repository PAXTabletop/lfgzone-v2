import { DateTime } from 'luxon';

export interface NewSession {
  event_id: number
  game_id: number
  status_id: number
}

export interface ApiGameSession {
  game_session_id?: number
  event_id: number
  game_id: number
  status_id: number
  created_at?: string; // timestamp
}

export interface GameSession extends ApiGameSession {
  event: Event;
  game: Game;
  status: Status;
  created?: DateTime;
}

export interface Game {
  game_id?: number;
  name: string;
}

export interface Event {
  event_id?: number;
  name: string;
}

export interface Status {
  status_id?: number;
  name: string;
}

export type Filter<T> = Partial<{
  [E in keyof T]: T[E]
}>
