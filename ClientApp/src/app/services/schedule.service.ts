import { Injectable } from '@angular/core';
import { Game } from '../model/interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private testSchedule: Game[] = [
    {
      id: 0,
      week: 1,
      homeTeam: 'LAR',
      homeSpread: 3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'BUF',
      awaySpread: -3,
      awayScore: null,
      awayPickValue: null,
      startDate: '9/8/2022',
      startTime: '8:20 PM',
    },
    {
      id: 1,
      week: 1,
      homeTeam: 'ATL',
      homeSpread: 3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'NO',
      awaySpread: -3,
      awayScore: null,
      awayPickValue: null,
      startDate: '9/11/2022',
      startTime: '1:00 PM',
    },
    {
      id: 2,
      week: 1,
      homeTeam: 'CIN',
      homeSpread: -7,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'PIT',
      awaySpread: 7,
      awayScore: null,
      awayPickValue: null,
      startDate: '9/11/2022',
      startTime: '1:00 PM',
    },
    {
      id: 0,
      week: 1,
      homeTeam: 'DET',
      homeSpread: 10,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'PHI',
      awaySpread: -10,
      awayScore: null,
      awayPickValue: null,
      startDate: '9/11/2022',
      startTime: '1:00 PM',
    },
  ]


  constructor() { }

  // TODO - replace mock schedule data

  getSchedule(): Game[] {
    return this.testSchedule;
  }
}
