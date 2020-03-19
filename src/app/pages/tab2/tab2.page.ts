import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article, RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false })
  public infiniteScroll: IonInfiniteScroll;

  @ViewChild(IonSegment, { static: true })
  public segment: IonSegment;

  public categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  public noticias: Article[] = [];

  public type = 'categoria';

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  onSegmentChange(e: CustomEvent) {

    this.noticias = [];
    this.infiniteScroll.disabled = false;
    this.noticiasService.resetPageStatus(this.type);

    this.cargarNoticias(e.detail.value);

  }

  onIonInfinite(e): void {

    if (this.noticiasService.pageTracker[this.type].onLastPage) {
      e.target.complete();
      this.infiniteScroll.disabled = true;
      return;
    }

    this.cargarNoticias(this.segment.value, e);

  }

  private cargarNoticias(categoria: string, e = { target: { complete: () => {} } }): void {

    this
      .noticiasService
      .getTopHeadlinesByCategory(categoria)
      .pipe(
        tap((respuesta: RespuestaTopHeadlines) => {
          this.noticias.push(...respuesta.articles);
          e.target.complete();
        })
      )
      .subscribe();

  }

}
