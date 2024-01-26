import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../main';
import {MovieInterface} from '../../types/movie.interface';
import {BehaviorSubject, tap} from 'rxjs';
import {ProfileInterface} from '../../types/profile.interface';
import {UserInterface} from '../../types/auth.interface';
import {PersistenceService} from '../persistence/persistence.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  favoritesMovies$ = new BehaviorSubject<MovieInterface[]>([]);
  user$ = new BehaviorSubject<UserInterface | null>(this.getUser());

  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
  ) {

  }


  getAllUsers(searchTerm?: string) {
    return this.http.get<UserInterface[]>(`${API_URL}/users`, {
      params: searchTerm
        ? {
          searchTerm,
        }
        : {},
    })
  }

  updateUser(id: string, data: ProfileInterface) {
    return this.http.put<UserInterface>(`${API_URL}/users/${id}`, data)

  }

  getUserById(id: string) {
    return this.http.get<UserInterface>(`${API_URL}/users/${id}`)
  }

  deleteUser(userId: string) {
    return this.http.delete<string>(`${API_URL}/users/${userId}`)
  }

  getCountUsers() {
    return this.http.get<number>(`${API_URL}/users/count`)
  }

  // Profile
  updateProfile(data: ProfileInterface) {
    return this.http.put<string>(`${API_URL}/users/profile`, data)
  }

  getProfile() {
    return this.http.get<UserInterface>(`${API_URL}/users/profile`)
  }

  // Favorites

  toggleFavorite(movieId: string) {
    return this.http.post(`${API_URL}/users/profile/favorites`, {movieId})
  }

  getFavoriteMovies() {
    return this.http.get<MovieInterface[]>(`${API_URL}/users/profile/favorites`).pipe(
      tap((movies) => {
        this.favoritesMovies$.next(movies);
      }),
    )

  }

  getUser() {
    return this.persistenceService.get('user')
  }

  setUser(data: UserInterface | null) {
    this.user$.next(data)
    this.persistenceService.set('user', data)
  }

}
