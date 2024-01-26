import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../main';
import {MovieInterface} from '../../types/movie.interface';
import {CommentInterface} from '../../types/comment.interface';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
  ) {
  }

  getMovies(searchTerm?: string) {
    return this.http.get<MovieInterface[]>(`${API_URL}/movies`, {
      params: searchTerm
        ? {
          searchTerm,
        }
        : {},
    })
  }


  getPopularMovies() {
    return this.http.get<MovieInterface[]>(`${API_URL}/movies/most-popular`)
  }

  getMovieBySlug(slug: string) {
    return this.http.get<MovieInterface>(`${API_URL}/movies/by-slug/${slug}`)
  }


  updateCountOpened(slug: string) {
    return this.http.post(`${API_URL}/movies/update-count-opened`, slug)
  }

  deleteMovieById(id: string) {
    return this.http.delete<string>(`${API_URL}/movies/${id}`)
  }

  createMovieId() {
    return this.http.post<string>(`${API_URL}/movies`, {})
  }

  getMovieById(id: string) {
    return this.http.get<MovieInterface>(`${API_URL}/movies/${id}`)
  }

  createMovie(id: string, data: any) {
    return this.http.put<string>(`${API_URL}/movies/${id}`, data)

  }

  // Genres
  getMoviesByGenres(genreIds: string[]) {
    return this.http.post<MovieInterface[]>(`${API_URL}/movies/by-genres`, genreIds)

  }


  // Actor
  getByActor(actorId: string) {
    return this.http.get<MovieInterface[]>(`${API_URL}/movies/by-actors/${actorId}`)
  }

  // Comments
  getComments(movieId: string) {
    return this.http.get<CommentInterface[]>(`${API_URL}/comment/by-movie/${movieId}`)
  }

  deleteComment(commentId: string) {
    this.toastrService.success('Comment deleted')
    return this.http.delete<string>(`${API_URL}/comment/${commentId}`)
  }

  createComment(body: { movieId: string, message: string }) {
    return this.http.post<string>(`${API_URL}/comment`, body)
  }
}
