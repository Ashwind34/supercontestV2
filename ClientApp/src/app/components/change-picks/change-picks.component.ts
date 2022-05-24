import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-change-picks',
  templateUrl: './change-picks.component.html',
  styleUrls: ['./change-picks.component.css']
})
export class ChangePicksComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        pick1: new FormControl(''),
        pick2: new FormControl(''),
        pick3: new FormControl(''),
        pick4: new FormControl(''),
        pick5: new FormControl('')
      }
    )
  }

}
