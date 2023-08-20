import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettingsService } from '@services/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private settingsService: AppSettingsService) {}

  canActivate(): Observable<boolean> {
    return this.settingsService.isAdmin$();
  }

}
