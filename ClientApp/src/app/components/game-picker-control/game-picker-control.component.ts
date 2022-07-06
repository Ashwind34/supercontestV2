import { GamePickerService } from './../../services/game-picker.service';
import { Game, Team } from './../../model/interfaces/game';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-picker-control',
  templateUrl: './game-picker-control.component.html',
  styleUrls: ['./game-picker-control.component.css']
})
export class GamePickerControlComponent implements OnInit {

  @Input() game: Game

  isHomeSelected: boolean;
  isAwaySelected: boolean;

  constructor( private gamePickerService: GamePickerService) { }

  ngOnInit(): void {
    this.gamePickerService.getCurrentPicks$().subscribe(
      currentPicks => {
        this.isHomeSelected = currentPicks.some(pick => pick?.team === this.game.homeTeam)
        this.isAwaySelected = currentPicks.some(pick => pick?.team === this.game.awayTeam)
      }
    )
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
