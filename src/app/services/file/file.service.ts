import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../main';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  constructor(
    private http: HttpClient,
  ) {
  }

  updateFile(file: FormData, folder: string) {
    return this.http.post<{ url: string; name: string }[]>(`${API_URL}/files`, file, {
      params: {folder},
    })
  }
}
