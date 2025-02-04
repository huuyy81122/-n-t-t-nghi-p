
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './module/app.module';
import { AppConfiguration, AppConfig } from './configuration';

(async () => {
  try {
    const config: AppConfiguration = await fetch('assets/configuration.json').then(res => res.json());

    if (config.production) {
      console.log('Running in production mode');
      enableProdMode();
    }
    if (config.dev) {
      console.log('Running in dev mode');
      enableProdMode();
    }
    platformBrowserDynamic([
      { provide: AppConfig, useValue: config }
    ]).bootstrapModule(AppModule)
      .catch(err => console.error(err));

  } catch (e) {
    console.error('Error initializing', e);
  }
})();