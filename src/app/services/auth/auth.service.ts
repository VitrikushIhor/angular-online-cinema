import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthInterface, AuthResponseInterface} from '../../types/auth.interface';
import {API_URL} from '../../../main';
import {ToastrService} from 'ngx-toastr';
import {PersistenceService} from '../persistence/persistence.service';
import {Router} from '@angular/router';
import {RedirectService} from '../redirect/redirect.service';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private persistence: PersistenceService,
    private redirectService: RedirectService,
    private toaster: ToastrService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
  ) {
  }

  register({email, password}: AuthInterface) {
    this.http.post<AuthResponseInterface>(`${API_URL}/auth/register`, {email, password}).subscribe((data) => {
        this.toaster.success('Register Success')
        this.setUserToLocalStorage(data)
        this.router.navigate(['/'])
        this.userService.setUser(data.user)
      },
      (error) => {
        this.toaster.error(error.error.message)
      })
  }

  login({email, password}: AuthInterface) {
    this.http.post<AuthResponseInterface>(`${API_URL}/auth/login`, {email, password}).subscribe((data) => {
        const redirectUrl = this.redirectService.getRedirectUrl() || '/';
        this.toaster.success('Login Success')
        this.setUserToLocalStorage(data)
        this.router.navigateByUrl(redirectUrl);
        this.userService.setUser(data.user)

      },
      (error) => {
        this.toaster.error(error.error.message)
      })
  }

  logout() {
    this.persistence.remove('user')
    this.persistence.remove('accessToken')
    this.persistence.remove('refreshToken')
    this.userService.setUser(null)
    this.router.navigate(['/login'])
    this.toaster.info('Logout Success')

  }

  getNewTokens() {
    const refreshToken = this.persistence.get('refreshToken')
    return this.http.post<AuthResponseInterface>(`${API_URL}/auth/login/access-token`, {
      refreshToken,
    })
  }

  setUserToLocalStorage(data: AuthResponseInterface) {
    this.persistence.set('accessToken', data.accessToken)
    this.persistence.set('refreshToken', data.refreshToken)
    this.persistence.set('user', data.user)
  }
}
