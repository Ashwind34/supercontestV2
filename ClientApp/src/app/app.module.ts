import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ChangePicksComponent } from './components/change-picks/change-picks.component';
import { GamePickerComponent } from './components/game-picker/game-picker.component';
import { GamePickerControlComponent } from './components/game-picker-control/game-picker-control.component';
import { CurrentPicksDisplayComponent } from './components/current-picks-display/current-picks-display.component';
import { LogoImageComponent } from './components/logo-image/logo-image.component';
import { DateClockComponent } from './components/date-clock/date-clock.component';
import { AppSettingsService } from '@services/app-settings.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

function initSettings(settingsService: AppSettingsService) {
  return () => settingsService.initSettings$().subscribe();
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ChangePicksComponent,
    GamePickerComponent,
    GamePickerControlComponent,
    CurrentPicksDisplayComponent,
    LogoImageComponent,
    DateClockComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'change-picks', component: ChangePicksComponent, canActivate: [AuthorizeGuard] },
      { path: 'admin', component: AdminComponent, canActivate: [AuthorizeGuard, AdminGuard] },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initSettings, deps: [ AppSettingsService ], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
