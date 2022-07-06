import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Team } from '../model/interfaces/game';

export interface TeamSelectionEvent {
  checked: boolean;
  team: Team;
  spread: number;
}

@Injectable({
  providedIn: 'root'
})
export class GamePickerService {

  private currentPicks$: BehaviorSubject<TeamSelectionEvent[]> = new BehaviorSubject(new Array(5))

  constructor() { }

  getCurrentPicks$() {
    return this.currentPicks$.asObservable();
  }

  updatePicks(event: TeamSelectionEvent): void {
    const existingPicks: TeamSelectionEvent[] = this.currentPicks$.value;
    if (event.checked) {
      const firstUndefinedIndex = existingPicks.findIndex(item => !item);
      const indexToReplace = (firstUndefinedIndex > -1) ? firstUndefinedIndex : 4;
      existingPicks.splice(indexToReplace, 1, event)
    } else {
      const indexOfTeamToRemove = existingPicks.findIndex(item => item.team === event.team);
      existingPicks.splice(indexOfTeamToRemove, 1)
      existingPicks.push(undefined)
    }
    this.currentPicks$.next(existingPicks);
  }



}
