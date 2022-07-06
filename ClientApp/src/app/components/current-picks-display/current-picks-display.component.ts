import { GamePickerService, TeamSelectionEvent } from './../../services/game-picker.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-picks-display',
  templateUrl: './current-picks-display.component.html',
  styleUrls: ['./current-picks-display.component.css']
})
export class CurrentPicksDisplayComponent implements OnInit {

  subscription: Subscription = new Subscription();

  picks: TeamSelectionEvent[] = [];

  constructor(private gamePickerService: GamePickerService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.gamePickerService.getCurrentPicks$().subscribe(
        picks => {
          this.picks = picks;
        }
      )
    )

  }

}
