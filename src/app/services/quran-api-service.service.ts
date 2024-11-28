import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuranApiServiceService {

  constructor(private http : HttpClient) { }
  private apiUrl1 = 'https://quranapi.pages.dev/api';
  private apiUrl = 'https://api.quranhub.com/v1/ayah';
  //private options = {method: 'GET', headers: {accept: 'application/json'}};

  // getAyah(ayahNumber: number, surahNumber: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${surahNumber}/${ayahNumber}.json`);
  // }
  getAyahTranslation(surahNumber: number,ayahNumber: number): Observable<any> {
    return this.http.get(`${this.apiUrl1}/${surahNumber}/${ayahNumber}.json`);
  }
  getAyah(surahNumber: number,ayahNumber: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${surahNumber}:${ayahNumber}`);
  }
}
