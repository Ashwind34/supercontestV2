import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TeamSelection, TeamSelectionEvent } from '../model/interfaces/team-selection';
import { UserPick } from '../model/interfaces/user-pick';

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

  constructor() { }

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

  savePicks(picks: TeamSelection[]) {
    const picksUpdate: UserPick = {
      userId: '',
      week: 1,
      createdOn: new Date().toISOString(),
      pick1: picks[0]?.team,
      pick2: picks[1]?.team,
      pick3: picks[2]?.team,
      pick4: picks[3]?.team,
      pick5: picks[4]?.team,
    }

    console.log(picksUpdate)

    // TODO - add POST API call here.

  }




}
