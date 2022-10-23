export namespace GameActions {
  export class GetAll {
    public static readonly type = '[Game] Get All';
  }

  export class Create {
    public static readonly type = '[Game] Create';

    constructor(public name: string) {}
  }
}
