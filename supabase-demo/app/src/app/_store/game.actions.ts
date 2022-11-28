export namespace GameActions {
  export class GetAll {
    public static readonly type = '[Game] Get All';
  }

  export class Create {
    public static readonly type = '[Game] Create';

    constructor(public name: string) {}
  }

  export class Search {
    public static readonly type = '[Game] Search';

    constructor(public name?: string) {}
  }

  export namespace Filter {
    export class Set {
      public static readonly type = '[Game Filter] Set';

      constructor(public name?: string) {}
    }

    export class Reset {
      public static readonly type = '[Game Filter] Reset';
    }
  }
}
