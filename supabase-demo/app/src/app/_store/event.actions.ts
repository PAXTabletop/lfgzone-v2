export namespace EventActions {
  export class GetAll {
    public static readonly type = '[Event] Get All';
  }

  // export class Create {
  //   public static readonly type = '[Event] Create';

  //   constructor(public name: string) {}
  // }

  export namespace Current {
    export class Set {
      public static readonly type = '[Event Current] Set';

      constructor(public id: number) {}
    }
  }
}
