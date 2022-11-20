import { GameSession, Filter, NewSession, ApiGameSession } from '../interfaces';
import { GameSessionStateModel } from './game_session.store';
import { Sort as SortMat } from '@angular/material/sort';
import { SessionService } from '../session.service';
export namespace GameSessionActions {
  export class GetAll {
    public static readonly type = '[GameSession] Get all';

    constructor(public ignoreFilter?: boolean) {}
  }

  export class Get {
    public static readonly type = '[GameSession] Get';

    constructor(public game_session_id: number) {}
  }

  export class Refresh {
    public static readonly type = '[GameSession] Refresh';

    constructor(public ignoreFilter?: boolean) {}
  }

  export class Create {
    public static readonly type = '[GameSession] Create';

    constructor(public gameSession: NewSession) {}
  }

  export class Close {
    public static readonly type = '[GameSession] Close';

    constructor(public gameSession: GameSession) {}
  }

  export class Extend {
    public static readonly type = '[GameSession] Extend';
    constructor(public gameSession: GameSession) {}
  }

  export class Update {
    public static readonly type = '[GameSession] Update';
    constructor(
      public gameSession: GameSession,
      public updateBlock: Partial<ApiGameSession>
    ) {}
  }

  export namespace Seats {
    export class Increment {
      public static readonly type = '[GameSession Seat] Increment';
      constructor(public gameSession: GameSession) {}
    }
    export class Decrement {
      public static readonly type = '[GameSession Seat] Decrement';
      constructor(public gameSession: GameSession) {}
    }
  }

  export namespace Filter {
    export class Set {
      public static readonly type = '[GameSession Filter] Set';

      constructor(public filter: Filter<GameSession>) {}
    }

    export class OpenSessions {
      public static readonly type = '[GameSession Filter] OpenSessions';
    }

    export class ManageSessions {
      public static readonly type = '[GameSession Filter] ManageSessions';
    }

    export class ArchiveSessions {
      public static readonly type = '[GameSession Filter] ArchiveSessions';
    }
  }

  export namespace Sort {
    export class Set {
      public static readonly type = '[GameSession Sort] Set';

      constructor(public sort: SortMat) {}
    }
  }
}
