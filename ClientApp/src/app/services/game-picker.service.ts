import { IUser } from './../../api-authorization/authorize.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TeamSelection, TeamSelectionEvent } from '../model/interfaces/team-selection';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { UserPick } from '../model/classes/user-pick';
import { Team } from '../model/interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GamePickerService {


  private currentPicks$: BehaviorSubject<TeamSelection[] | null> = new BehaviorSubject(null)

  baseUrl: string;

  constructor(
    private authService: AuthorizeService,
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getUserPicks(userId: string, week: number): Observable<UserPick> {
    return this.http.get(`api/UserPicks/${week}/${userId}`) as Observable<UserPick>
  }


  parseUserPick(pick: UserPick): TeamSelection[] {
    const selectedTeams: TeamSelection[] = [
      {
        team: pick.pick1 as Team,
        spread: pick.spread1
      },
      {
        team: pick.pick2 as Team,
        spread: pick.spread2
      },
      {
        team: pick.pick3 as Team,
        spread: pick.spread3
      },
      {
        team: pick.pick4 as Team,
        spread: pick.spread4
      },
      {
        team: pick.pick5 as Team,
        spread: pick.spread5
      }
    ]

    return selectedTeams;
  }



  initCurrentPicks$() {
    const week = 1;
    return this.authService.getUser().pipe(
      take(1),
      map((user: IUser) => user['sub']),
      switchMap((userId: string) => {
        return this.getUserPicks(userId, week)
          // if the user hasn't made picks this week, return empty picks object
          .pipe(catchError(() => {
            const emptyPick = new UserPick(userId, week);
            return of(emptyPick);
          }))
      }),
      map((pickRecord: UserPick) => {

        const currentPicks = this.parseUserPick(pickRecord);
        // const currentPicks: TeamSelection[] = [];
        // for (const prop in picks) {
        //   if (prop.includes('pick')) {
        //       currentPicks.push({
        //         team: picks[prop]
        //       })
        //   }
        // }

        // if (currentPicks.length < 5) {
        //   let spotsToFill = 5 - currentPicks.length;
        //   while (spotsToFill > 0) {
        //     currentPicks.push(undefined)
        //     spotsToFill -= 1;
        //   }
        // }

        return currentPicks;
      }),
      tap((currentPicks: TeamSelection[]) => {
        this.currentPicks$.next(currentPicks);
      })

    )
  }

  getCurrentPicks$() {
    return this.currentPicks$.asObservable();
  }

  updatePicks(event: TeamSelectionEvent): void {
    const existingPicks: TeamSelection[] = this.currentPicks$.value;
    if (event.checked) {
      const firstUndefinedIndex = existingPicks.findIndex(item => !item.team);
      const indexToReplace = (firstUndefinedIndex > -1) ? firstUndefinedIndex : 4;
      delete event.checked;
      existingPicks.splice(indexToReplace, 1, event)
    } else {
      const indexOfTeamToRemove = existingPicks.findIndex(item => item.team === event.team);
      existingPicks.splice(indexOfTeamToRemove, 1)
      existingPicks.push(
        {
          team: undefined,
          spread: undefined
        }
      )
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
          spread1: picks[0]?.spread,
          pick2: picks[1]?.team,
          spread2: picks[1]?.spread,
          pick3: picks[2]?.team,
          spread3: picks[2]?.spread,
          pick4: picks[3]?.team,
          spread4: picks[3]?.spread,
          pick5: picks[4]?.team,
          spread5: picks[4]?.spread,
        }

        return picksUpdate
      }),
      switchMap(picks => {
        return this.http.post(`api/UserPicks`, picks)
      })
    )
  }




}
