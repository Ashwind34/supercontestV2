import { Component, OnInit } from '@angular/core';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { GamePickerService } from './../../services/game-picker.service';


@Component({
  selector: 'app-change-picks',
  templateUrl: './change-picks.component.html',
  styleUrls: ['./change-picks.component.css']
})
export class ChangePicksComponent implements OnInit {

  constructor(private gamePickerService: GamePickerService, private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.authorizeService.getUser().subscribe(x => console.log('user', x))
  }

  getCurrentPicks$() {
    return this.gamePickerService.getCurrentPicks$();
  }

}
