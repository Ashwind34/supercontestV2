import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TeamSelection, TeamSelectionEvent } from '../model/interfaces/team-selection';
import { UserPick } from '../model/interfaces/user-pick';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { map, switchMap, take } from 'rxjs/operators';

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

  private currentPicks$: BehaviorSubject<TeamSelection[]> = new BehaviorSubject(this.testData)

  baseUrl: string;

  constructor(
    private authService: AuthorizeService,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
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
