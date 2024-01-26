import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {

  constructor() {
  }

  set(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to localStorage')
    }
  }

  remove(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error('Error deleted from localStorage')
    }
  }

  get(key: string) {
    try {
      //@ts-ignore
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      console.error('Error getting data from localStorage')
      return null
    }
  }
}
