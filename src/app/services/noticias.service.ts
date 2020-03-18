import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines(): Observable<RespuestaTopHeadlines> {
    return this
            .http
            .get<RespuestaTopHeadlines>(
              `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=545b637c479641509d397ea971a99728`
            );
  }

}
