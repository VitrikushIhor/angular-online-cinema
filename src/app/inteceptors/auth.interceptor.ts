import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth/auth.service';
import {PersistenceService} from '../services/persistence/persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private persistenceService: PersistenceService,
    private authService: AuthService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = this.addAuthorizationHeader(request);

    return next.handle(modifiedRequest).pipe(
      catchError((error) => {
        if (
          (error.status === 401 ||
            error.error.message === 'jwt expired' ||
            error.error.message === 'jwt must be provided')
        ) {
          return this.authService.getNewTokens()
            .pipe(
              switchMap(() => {
                return next.handle(this.addAuthorizationHeader(request));
              }),
              catchError((refreshError) => {
                if (error.error.message === 'jwt expired') {
                  this.removeTokens()
                }
                return throwError(refreshError);
              }),
            )
        }
        return throwError(error);
      }),
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    // Додаємо токен авторизації до заголовків запиту
    const token = this.persistenceService.get('accessToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }

  private removeTokens() {
    this.persistenceService.remove('accessToken')
    this.persistenceService.remove('refreshToken')
    this.persistenceService.remove('user')
  }
}
