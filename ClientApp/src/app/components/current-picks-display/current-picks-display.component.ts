import { GamePickerService } from './../../services/game-picker.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamSelection } from 'src/app/model/interfaces/team-selection';

@Component({
  selector: 'app-current-picks-display',
  templateUrl: './current-picks-display.component.html',
  styleUrls: ['./current-picks-display.component.css']
})
export class CurrentPicksDisplayComponent implements OnInit {

  subscription: Subscription = new Subscription();

  picks: TeamSelection[] = [];

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

  savePicks(): void {
    this.gamePickerService.savePicks(this.picks);
  }

}
