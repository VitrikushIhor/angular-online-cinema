import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private redirectUrl: string = '';

  constructor() {
  }


  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl;
  }
}
