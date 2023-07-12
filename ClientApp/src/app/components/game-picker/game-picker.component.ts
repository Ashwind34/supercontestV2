import { Component, OnInit } from '@angular/core';
import { Game } from '../../model/interfaces/game';
import { ScheduleService } from '../../services/schedule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-picker',
  templateUrl: './game-picker.component.html',
  styleUrls: ['./game-picker.component.css']
})
export class GamePickerComponent implements OnInit {

  constructor(
    private scheduleService: ScheduleService,
  ) { }

  schedule;

  ngOnInit(): void {
    this.scheduleService.getSchedule$(1).subscribe(schedule => {
      this.schedule = schedule
    })
  }

  getSchedule$(week?: number): Observable<any> {
    return this.scheduleService.getSchedule$(week)
  }

}
