export type Team = ''

export type PickValue = -1 | 0 | 1;

export interface Game {
  id: number;
  week: number;
  homeTeam: Team;
  homeSpread: number;
  homeScore: number;
  homePickValue: PickValue;
  awayTeam: Team;
  awaySpread: number;
  awayScore: number;
  awayPickValue: PickValue;
  startDate: string;
  startTime: string;
}
