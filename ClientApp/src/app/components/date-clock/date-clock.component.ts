import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-date-clock',
  templateUrl: './date-clock.component.html',
  styleUrls: ['./date-clock.component.css']
})
export class DateClockComponent implements OnInit {

  dateTime: string;

  constructor() { }

  ngOnInit(): void {
    // setTimeout(this.setDateTime, 1000)
    this.setDateTime$().subscribe(
      (dateTime) => this.dateTime = dateTime
    )
  }

  setDateTime$(): Observable<string> {
    return timer(0, 1000).pipe(
      map(() => {
        const today = new Date();
        let date = today.toDateString();
        let hours = today.getHours();
        let minutes = this.checkMinsAndSecs(today.getMinutes());
        let seconds = this.checkMinsAndSecs(today.getSeconds());
        const dateTime = `${date}  ${hours}:${minutes}:${seconds}`;
        return dateTime;
      })
    )

  }

  checkMinsAndSecs(number) {
    if (number < 10) {
      number = '0' + number;
    }
    return number;
  }

}
