export class UserPick {

  constructor(public userId: string, public week: number) {}

  id?: string;
  createdOn: Date = new Date();
  updatedOn: Date = new Date();
  pick1: string;
  spread1: number;
  pick2: string;
  spread2: number;
  pick3: string;
  spread3: number;
  pick4: string;
  spread4: number;
  pick5: string;
  spread5: number;

}
