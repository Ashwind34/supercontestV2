import { GamePickerService } from './../../services/game-picker.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/interfaces/game';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-game-picker',
  templateUrl: './game-picker.component.html',
  styleUrls: ['./game-picker.component.css']
})
export class GamePickerComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
    private gamePickerService: GamePickerService
  ) { }

  schedule: Game[];

  ngOnInit(): void {
    this.schedule = this.scheduleService.getSchedule();
    this.gamePickerService.getCurrentPicks$().subscribe(picks => console.log('new picks', picks))
  }

  onChange($event) {
    console.log('event', $event.target.checked)
  }

}
