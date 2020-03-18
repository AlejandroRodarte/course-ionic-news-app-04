import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article, RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {

    this
      .noticiasService
      .getTopHeadlines()
      .pipe(
        tap(
          (respuesta: RespuestaTopHeadlines) => this.noticias.push(...respuesta.articles)
        )
      )
      .subscribe();

  }

}
