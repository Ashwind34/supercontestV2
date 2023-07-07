import { IUser } from './../../api-authorization/authorize.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TeamSelection, TeamSelectionEvent } from '../model/interfaces/team-selection';
import { UserPick } from '../model/interfaces/user-pick';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamePickerService {

  testData: TeamSelection[] = [
    {
        "team": "BUF",
        "spread": -3
    },
    {
        "team": "ATL",
        "spread": 3
    },
    {
        "team": "PIT",
        "spread": 7
    },
    {
        "team": "DET",
        "spread": 10
    },
    undefined
  ]

  private currentPicks$: BehaviorSubject<TeamSelection[] | null> = new BehaviorSubject(null)

  baseUrl: string;

  constructor(
    private authService: AuthorizeService,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  initCurrentPicks$() {
    const week = 1;
    return this.authService.getUser().pipe(
      take(1),
      map((user: IUser) => user['sub']),
      switchMap((userId: string) => {
        return this.http.get(`api/UserPicks/${week}/${userId}`)
      }),
      tap(httpResponse => console.log('res', httpResponse))

    )
  }

  getCurrentPicks$() {
    return this.currentPicks$.asObservable();
  }

  updatePicks(event: TeamSelectionEvent): void {
    const existingPicks: TeamSelection[] = this.currentPicks$.value;
    if (event.checked) {
      const firstUndefinedIndex = existingPicks.findIndex(item => !item);
      const indexToReplace = (firstUndefinedIndex > -1) ? firstUndefinedIndex : 4;
      delete event.checked;
      existingPicks.splice(indexToReplace, 1, event)
    } else {
      const indexOfTeamToRemove = existingPicks.findIndex(item => item.team === event.team);
      existingPicks.splice(indexOfTeamToRemove, 1)
      existingPicks.push(undefined)
    }
    this.currentPicks$.next(existingPicks);
  }

  savePicks$(picks: TeamSelection[]): Observable<any> {
    return this.authService.getUser().pipe(
      take(1),
      map(user => {
        const picksUpdate: UserPick = {
          userId: user['sub'],
          week: 1,
          createdOn: new Date(),
          updatedOn: new Date(),
          pick1: picks[0]?.team,
          pick2: picks[1]?.team,
          pick3: picks[2]?.team,
          pick4: picks[3]?.team,
          pick5: picks[4]?.team,
        }

        return picksUpdate
      }),
      switchMap(picks => {
        return this.http.post(`api/UserPicks`, picks)
      })
    )




  }




}
