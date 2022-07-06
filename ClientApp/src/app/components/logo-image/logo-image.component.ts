import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/model/interfaces/game';

@Component({
  selector: 'app-logo-image',
  templateUrl: './logo-image.component.html',
  styleUrls: ['./logo-image.component.css']
})
export class LogoImageComponent implements OnInit {

  @Input() team: Team;
  @Input() width: number = 48;

  private readonly logoFolderPath: string = './assets/logos';

  logoFilePath: string;

  constructor() { }

  ngOnInit(): void {
    this.logoFilePath = `${this.logoFolderPath}/${this.team}.png`;
  }
}
