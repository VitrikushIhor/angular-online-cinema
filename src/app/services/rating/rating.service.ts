import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class RatingService {

  constructor(
    private http: HttpClient,
  ) {
  }

  setRating(movieId: string, value: number) {
    return this.http.post<string>(`${API_URL}/ratings/set-rating`, {movieId, value})
  }

  getByUserMovie(movieId: string) {
    return this.http.get<number>(`${API_URL}/ratings/${movieId}`)
  }

}
