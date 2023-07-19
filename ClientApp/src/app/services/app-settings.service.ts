import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppSettings } from '../model/interfaces/app-settings';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private appSettings: IAppSettings;

  constructor(private http: HttpClient) { }

  initSettings$(): Observable<IAppSettings> {
    return this.http.get<IAppSettings>('api/Settings').pipe(
      tap((settings: IAppSettings) => this.appSettings = settings[0])
    )
  }

  getSettings(): IAppSettings {
    return this.appSettings;
  }

}
