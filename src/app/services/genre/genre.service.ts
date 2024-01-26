import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../main';
import {CollectionInterface, GenreInterface} from '../../types/genre.interface';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  getPopularGenres() {
    return this.http.get<GenreInterface[]>(`${API_URL}/genres/popular`)
  }

  getCollections() {
    return this.http.get<CollectionInterface[]>(`${API_URL}/genres/collections`)
  }

  getGenreBySlug(slug: string) {
    return this.http.get<GenreInterface>(`${API_URL}/genres/by-slug/${slug}`)
  }

  getGenresByIds(genreIds: any) {
    return this.http.post<GenreInterface>(`${API_URL}/movies/by-genres`,
      genreIds,
    )
  }

  getAllGenres(searchTerm?: string) {
    return this.http.get<GenreInterface[]>(`${API_URL}/genres`, {
      params: searchTerm
        ? {
          searchTerm,
        }
        : {},
    })
  }

  removeGenre(id: string) {
    return this.http.delete<string>(`${API_URL}/genres/${id}`)
  }

  createGenre() {
    return this.http.post<GenreInterface>(`${API_URL}/genres`, {})
  }

  getGenreById(id: string) {
    return this.http.get<GenreInterface>(`${API_URL}/genres/${id}`)
  }

  updateGenre(id: string, data: GenreInterface) {
    return this.http.put<GenreInterface>(`${API_URL}/genres/${id}`, data)
  }
}
