import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';

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

  constructor(
    private noticiasService: NoticiasService
  ) {}

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.noticiasService.getTopHeadlinesByCategory(this.categorias[0]).subscribe(console.log);
  }

}
