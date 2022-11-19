import { DateTime } from 'luxon';

export interface NewSession {
  event_id: number;
  game_id: number;
  status_id: number;
}

export interface ApiGameSession {
  bgg_id?: string | number | null;
  game_session_id?: number;
  event_id: number;
  game_id: number;
  status_id: number;
  created_at?: string; // timestamp
  game_name?: string;
  status_name?: string;
}

export const apiToGameSession = (api: ApiGameSession): GameSession => ({
  ...api,
  game: {
    game_id: api.game_id,
    name: api.game_name || '',
  },
  event: {
    event_id: api.event_id,
    name: 'we should really get this in the view too',
  },
  status: {
    status_id: api.status_id,
    name: api.status_name || '',
  },
  created: api.created_at ? DateTime.fromISO(api.created_at) : undefined,
});

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
  [E in keyof T]: T[E];
}>;
