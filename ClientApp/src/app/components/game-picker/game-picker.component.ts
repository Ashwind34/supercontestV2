import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/interfaces/game';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-game-picker',
  templateUrl: './game-picker.component.html',
  styleUrls: ['./game-picker.component.css']
})
export class GamePickerComponent implements OnInit {

  constructor(private scheduleService: ScheduleService) { }

  schedule: Game[];

  ngOnInit(): void {
    this.schedule = this.scheduleService.getSchedule();
  }

}
