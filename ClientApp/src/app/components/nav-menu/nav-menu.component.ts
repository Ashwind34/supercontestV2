import { Component } from '@angular/core';
import { AppSettingsService } from '@services/app-settings.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  isAdmin$: Observable<boolean>

  constructor(private settingsService: AppSettingsService) {
    this.setAdmin$();
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  setAdmin$(): void {
    this.isAdmin$ = this.settingsService.isAdmin$();
  }
}
