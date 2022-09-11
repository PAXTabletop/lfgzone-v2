import { GameSession, Filter } from "../interfaces"

export namespace GameSessionActions {
  export class GetAll {
    public static readonly type = '[GameSession] Get all'

    constructor(public ignoreFilter?: boolean) {}
  }

  export class Get {
    public static readonly type = '[GameSession] Get'

    constructor(public game_session_id: number) {}
  }

  export class Create {
    public static readonly type = '[GameSession] Create'

    constructor(public gameSession: GameSession) {}
  }

  export class Close {
    public static readonly type = '[GameSession] Close'

    constructor(public gameSession: GameSession) {}
  }

  export namespace Filter {
    export class Set {
      public static readonly type = '[GameSession Filter] Set'

      constructor(public filter: Filter<GameSession>) {}
    }
  }

}
