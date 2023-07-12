import { GamePickerService } from './../../services/game-picker.service';
import { Game, Team } from './../../model/interfaces/game';
import { Component, Input, OnInit } from '@angular/core';
import { TeamSelection } from 'src/app/model/interfaces/team-selection';
import { UserPick } from '../../model/classes/user-pick';

@Component({
  selector: 'app-game-picker-control',
  templateUrl: './game-picker-control.component.html',
  styleUrls: ['./game-picker-control.component.css']
})
export class GamePickerControlComponent implements OnInit {

  @Input() game: Game

  isHomeSelected: boolean;
  isAwaySelected: boolean;
  isHomeDisabled: boolean;
  isAwayDisabled: boolean;

  startDate: string;
  startTime: string;

  constructor( private gamePickerService: GamePickerService) { }

  ngOnInit(): void {
    this.gamePickerService.getCurrentPicks$().subscribe(
      currentPicks => {
        if (currentPicks) {
          this.isHomeSelected = currentPicks.some(pick => pick?.team === this.game.homeTeam)
          this.isAwaySelected = currentPicks.some(pick => pick?.team === this.game.awayTeam)
          this.disableCheckboxes(currentPicks, this.isHomeSelected, this.isAwaySelected)
        }
      }
    )

    console.log(this.game.startTime)

    const startDateTime = new Date(this.game.startTime+'Z');


    this.startDate = startDateTime.toDateString();
    this.startTime = startDateTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }




  disableCheckboxes(picks: TeamSelection[], isHomeSelected: boolean, isAwaySelected: boolean): void {
    this.isHomeDisabled = false;
    this.isAwayDisabled = false;
    const isAllPicksSelected = picks.every(pick => pick.team);
    const rightNow = Date.now();
    const gameDateTime = new Date(this.game.startTime);
    // const hasGameStarted = (rightNow > gameDateTime.getTime());
    const hasGameStarted = false;

    if (hasGameStarted) {
      this.isHomeDisabled = true;
      this.isAwayDisabled = true;
      return;
    }

    if (isAwaySelected) {
      this.isHomeDisabled = true;
    }

    if (isHomeSelected) {
      this.isAwayDisabled = true;
    }

    if (
      !this.isHomeDisabled
      && !this.isAwayDisabled
      && isAllPicksSelected
    ) {
      this.isHomeDisabled = true;
      this.isAwayDisabled = true;
    }

  }

  onChange(event, team: Team, spread: number) {
    const checked = event.target.checked;
    const teamSelectionEvent = {
      checked,
      team,
      spread
    }

    this.gamePickerService.updatePicks(teamSelectionEvent);
  }



}
