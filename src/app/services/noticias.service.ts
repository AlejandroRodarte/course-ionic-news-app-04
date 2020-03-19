import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaTopHeadlines, PagesTracker } from '../interfaces/interfaces';
import { environment } from './../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private httpHeaders = new HttpHeaders({
    'X-Api-key': environment.apiKey
  });

  public pageTracker: PagesTracker = {
    usuario: {
      actualPage: 1,
      totalPages: 1,
      onLastPage: false
    },
    categoria: {
      actualPage: 1,
      totalPages: 1,
      onLastPage: false
    }
  };

  private pageSize = 10;

  private updatePageStatus = (type: keyof PagesTracker) => (respuesta: RespuestaTopHeadlines) => {

    this.pageTracker[type].totalPages = Math.ceil(respuesta.totalResults / this.pageSize);

    if (this.pageTracker[type].totalPages <= this.pageTracker[type].actualPage) {
      this.pageTracker[type].onLastPage = true;
    } else {
      this.pageTracker[type].actualPage++;
    }

  }

  constructor(
    private http: HttpClient
  ) { }

  resetPageStatus(type: string): void {
    this.pageTracker[type].actualPage = 1;
    this.pageTracker[type].onLastPage = false;
  }

  getTopHeadlines(): Observable<RespuestaTopHeadlines> {

    return this
            .executeQuery<RespuestaTopHeadlines>(
              `/top-headlines?country=us&pageSize=${this.pageSize}&page=${this.pageTracker.usuario.actualPage}`
            )
            .pipe(
              tap(this.updatePageStatus('usuario'))
            );

  }

  getTopHeadlinesByCategory(category: string): Observable<RespuestaTopHeadlines> {
    return this
            .executeQuery<RespuestaTopHeadlines>(
              `/top-headlines?country=us&pageSize=${this.pageSize}&page=${this.pageTracker.categoria.actualPage}&category=${category}`
            )
            .pipe(
              tap(this.updatePageStatus('categoria'))
            );
  }

  private executeQuery<T>(query: string): Observable<T> {
    return this.http.get<T>(`${environment.baseUrl}${query}`, { headers: this.httpHeaders });
  }

}
