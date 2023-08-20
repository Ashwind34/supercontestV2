import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppSettings } from '../model/interfaces/app-settings';
import { Observable, ReplaySubject, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  appSettings$: ReplaySubject<IAppSettings> = new ReplaySubject(1);

  constructor(private http: HttpClient, private authService: AuthorizeService) { }

  initSettings$(): Observable<IAppSettings> {
    return this.http.get<IAppSettings>('api/Settings').pipe(
      tap((settings: IAppSettings) => this.appSettings$.next(settings[0]))
    )
  }

  getSettings$(): Observable<IAppSettings> {
    return this.appSettings$.asObservable();
  }

  isAdmin$(): Observable<any> {
    return this.authService.getUser().pipe(
      map(user => user?.['sub']),
      switchMap(userId => {
        return userId ? this.http.get(`api/Settings/isAdmin/${userId}`) : of(false);
      })
    )
  }

}
