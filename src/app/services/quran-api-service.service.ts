import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuranApiServiceService {

  constructor(private http : HttpClient) { }
  private apiUrl = 'https://quranapi.pages.dev/api';
  

  getAyah(ayahNumber: number, surahNumber: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${surahNumber}/${ayahNumber}.json`);
  }
}
