import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article, RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

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

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  onSegmentChange(e: CustomEvent) {
    this.noticias = [];
    this.cargarNoticias(e.detail.value);
  }

  private cargarNoticias(categoria: string): void {

    this
      .noticiasService
      .getTopHeadlinesByCategory(categoria)
      .pipe(
        tap((respuesta: RespuestaTopHeadlines) => this.noticias.push(...respuesta.articles))
      )
      .subscribe();

  }

}
