import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppSettings } from '../model/interfaces/app-settings';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  appSettings$: ReplaySubject<IAppSettings> = new ReplaySubject(1);

  constructor(private http: HttpClient) { }

  initSettings$(): Observable<IAppSettings> {
    return this.http.get<IAppSettings>('api/Settings').pipe(
      tap((settings: IAppSettings) => this.appSettings$.next(settings[0]))
    )
  }

  getSettings$(): Observable<IAppSettings> {
    return this.appSettings$.asObservable();
  }

}
