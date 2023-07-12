import { Injectable } from '@angular/core';
import { Game } from '../model/interfaces/game';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private updateUrl = 'api/Schedule/bulk'

  private testSchedule = [
    {
      week: 1,
      homeTeam: 'LAR',
      homeSpread: 3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'BUF',
      awaySpread: -3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-8Z00:20:00'),
    },
    {
      week: 1,
      homeTeam: 'ATL',
      homeSpread: 3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'NO',
      awaySpread: -3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'CIN',
      homeSpread: -7,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'PIT',
      awaySpread: 7,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'DET',
      homeSpread: 10,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'PHI',
      awaySpread: -10,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'CHI',
      homeSpread: 6,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'SF',
      awaySpread: -6,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'MIA',
      homeSpread: -3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'NE',
      awaySpread: 3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'NYJ',
      homeSpread: -7,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'BAL',
      awaySpread: 7,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'WAS',
      homeSpread: -4,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'JAX',
      awaySpread: 4,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'CAR',
      homeSpread: -8,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'CLE',
      awaySpread: 8,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'HOU',
      homeSpread: 9,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'IND',
      awaySpread: -9,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z20:00:00'),
    },
    {
      week: 1,
      homeTeam: 'TEN',
      homeSpread: -3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'NYG',
      awaySpread: 3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z23:25:00'),
    },
    {
      week: 1,
      homeTeam: 'MIN',
      homeSpread: -3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'GB',
      awaySpread: 3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z23:25:00'),
    },
    {
      week: 1,
      homeTeam: 'ARI',
      homeSpread: 3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'KC',
      awaySpread: -3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z23:25:00'),
    },
    {
      week: 1,
      homeTeam: 'LAC',
      homeSpread: -6,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'LV',
      awaySpread: 6,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-11Z23:25:00'),
    },
    {
      week: 1,
      homeTeam: 'DAL',
      homeSpread: -4,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'TB',
      awaySpread: 4,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-12Z00:20:00'),
    },
    {
      week: 1,
      homeTeam: 'SEA',
      homeSpread: -3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'DEN',
      awaySpread: 3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-13Z00:15:00'),
    },
    {
      week: 2,
      homeTeam: 'PHI',
      homeSpread: -3,
      homeScore: null,
      homePickValue: null,
      awayTeam: 'DAL',
      awaySpread: 3,
      awayScore: null,
      awayPickValue: null,
      startTime: new Date('2023-9-20Z00:15:00'),
    },
  ]


  constructor(private http: HttpClient ) { }

  // TODO - replace mock schedule data

  getSchedule() {
    return this.testSchedule;
  }

  getSchedule$(week?: number): Observable<any> {
    const url = week ? `api/Schedule/${week}` : `api/Schedule`;
    return this.http.get(url);
  }

  // TODO - this takes forever, need to investigate
  updateSchedule$(games: Game[]): Observable<any> {
    const initGames = this.testSchedule;
    console.log(initGames)
    // return of()
    return this.http.put(this.updateUrl, initGames);
  }
}
