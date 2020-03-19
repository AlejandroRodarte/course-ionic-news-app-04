import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article, RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false })
  public infiniteScroll: IonInfiniteScroll;

  public noticias: Article[] = [];

  public type = 'usuario';

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  onIonInfinite(e): void {

    if (this.noticiasService.pageTracker[this.type].onLastPage) {
      e.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }

    this.cargarNoticias(e);

  }

  private cargarNoticias(e = { target: { complete: () => {} } }): void {

    this
      .noticiasService
      .getTopHeadlines()
      .pipe(
        tap(
          (respuesta: RespuestaTopHeadlines) => {
            this.noticias.push(...respuesta.articles);
            e.target.complete();
          }
        )
      )
      .subscribe();

  }

}
