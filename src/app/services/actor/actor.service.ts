import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../main';
import {InterfaceActor} from '../../types/actor.types';
import {MovieActorInterface} from '../../types/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class ActorService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllActors(searchTerm?: string) {
    return this.http.get<InterfaceActor[]>(`${API_URL}/actors`, {
      params: searchTerm
        ? {
          searchTerm,
        }
        : {},
    })
  }


  getActorBySlug(slug: string) {
    return this.http.get<MovieActorInterface>(`${API_URL}/actors/by-slug/${slug}`)
  }

  deleteActorById(actorId: string) {
    return this.http.delete<string>(`${API_URL}/actors/${actorId}`)
  }

  createActor() {
    return this.http.post<string>(`${API_URL}/actors/`, {})
  }

  getActorById(actorId: string) {
    return this.http.get<InterfaceActor>(`${API_URL}/actors/${actorId}`)
  }

  updateActor(id: string, actor: InterfaceActor) {
    return this.http.put<InterfaceActor>(`${API_URL}/actors/${id}`, actor)
  }
}
