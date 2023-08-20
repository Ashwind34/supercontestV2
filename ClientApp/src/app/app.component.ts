import { Component } from '@angular/core';
import { AppSettingsService } from '@services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private settingsService: AppSettingsService) {}

  title = 'The SuperContest';

  ngOnInit(): void {
    this.settingsService.initSettings$().subscribe();
  }
}
