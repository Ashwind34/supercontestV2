export class UserPick {

  constructor(public userId: string, public week: number) {}

  id?: string;
  createdOn: Date = new Date();
  updatedOn: Date = new Date();
  pick1: string;
  pick2: string;
  pick3: string;
  pick4: string;
  pick5: string;

}
