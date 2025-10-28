import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {provideHighcharts} from 'highcharts-angular';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { jwtInterceptorInterceptor } from './Auth/interceptor/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHighcharts(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient( withInterceptors([jwtInterceptorInterceptor]))]
};
