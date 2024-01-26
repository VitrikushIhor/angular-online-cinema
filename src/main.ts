/// <reference types="@angular/localize" />

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

export const API_URL = 'https://online-cinema-api.onrender.com/api'
// export const API_URL = 'http://localhost:5001/api'


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
