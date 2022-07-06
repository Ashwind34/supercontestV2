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

  private currentPicks$: BehaviorSubject<TeamSelectionEvent[]> = new BehaviorSubject([])

  constructor() { }

  getCurrentPicks$() {
    return this.currentPicks$.asObservable();
  }

  updatePicks(event: TeamSelectionEvent): void {
    const existingPicks: TeamSelectionEvent[] = this.currentPicks$.value;
    if (event.checked) {
      existingPicks.push(event);
      this.currentPicks$.next(existingPicks);
    } else {
      const filteredPicks = existingPicks.filter(pick => pick.team !== event.team);
      this.currentPicks$.next(filteredPicks);
    }
  }



}
