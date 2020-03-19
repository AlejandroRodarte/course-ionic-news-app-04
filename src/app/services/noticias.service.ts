import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private httpHeaders = new HttpHeaders({
    'X-Api-key': environment.apiKey
  });

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines(): Observable<RespuestaTopHeadlines> {
    return this.executeQuery<RespuestaTopHeadlines>('/top-headlines?country=us');
  }

  getTopHeadlinesByCategory(category: string): Observable<RespuestaTopHeadlines> {
    return this.executeQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${category}`);
  }

  private executeQuery<T>(query: string): Observable<T> {
    return this.http.get<T>(`${environment.baseUrl}${query}`, { headers: this.httpHeaders });
  }

}
