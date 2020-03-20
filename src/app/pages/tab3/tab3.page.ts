import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public noticias: Article[] = [];

  constructor(
    private dataLocalService: DataLocalService
  ) {}

  async ngOnInit() {

    await this.dataLocalService.cargarFavoritos();
    this.noticias = this.dataLocalService.getNoticias();

    this.dataLocalService.noticiasChanged.subscribe(() => this.noticias = this.dataLocalService.getNoticias());

  }

}
