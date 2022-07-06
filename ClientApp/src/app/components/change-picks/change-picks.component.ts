import { Component, OnInit } from '@angular/core';
import { GamePickerService } from './../../services/game-picker.service';


@Component({
  selector: 'app-change-picks',
  templateUrl: './change-picks.component.html',
  styleUrls: ['./change-picks.component.css']
})
export class ChangePicksComponent implements OnInit {

  constructor(private gamePickerService: GamePickerService) { }

  ngOnInit(): void {

  }

  getCurrentPicks$() {
    return this.gamePickerService.getCurrentPicks$();
  }

}
