import { GamePickerService, TeamSelectionEvent } from './../../services/game-picker.service';
import { Game, Team } from './../../model/interfaces/game';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-picker-control',
  templateUrl: './game-picker-control.component.html',
  styleUrls: ['./game-picker-control.component.css']
})
export class GamePickerControlComponent implements OnInit {

  @Input() game: Game

  constructor( private gamePickerService: GamePickerService) { }

  ngOnInit(): void {
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
