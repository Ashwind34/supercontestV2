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
      startDate: null,
      startTime: null,
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
      startDate: null,
      startTime: null,
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
      startDate: null,
      startTime: null,
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
      startDate: null,
      startTime: null,
    },
  ]


  constructor() { }

  // TODO - replace mock schedule data

  getSchedule(): Game[] {
    return this.testSchedule;
  }
}
