import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public noticias: Article[] = [];

  public sliderOptions = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private dataLocalService: DataLocalService,
    private noticiasService: NoticiasService
  ) {}

  async ngOnInit() {

    await this.dataLocalService.cargarFavoritos();
    this.noticias = this.dataLocalService.getNoticias();

    this.dataLocalService.noticiasChanged.subscribe(() => this.noticias = this.dataLocalService.getNoticias());
  }

  ionViewWillEnter() {
    this.noticiasService.favoriteMode = 'delete';
  }

}
