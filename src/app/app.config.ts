import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './services/config/config.service';
import { StorageService } from './services/storage/storage.service';
import { ThemeService } from './services/theme/theme.service';
import { MenuService } from './services/menu/menu.service';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule),
    ConfigService,
    StorageService,
    ThemeService,
    MenuService,
  ]
};
