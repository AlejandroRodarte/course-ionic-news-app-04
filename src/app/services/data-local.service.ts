import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public noticias: Article[] = [];

  constructor(
    private storage: Storage
  ) { }

  guardarNoticia(noticia: Article): void {

    const existe = this.noticias.find((noticiaActual: Article) => noticia.title === noticiaActual.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }

  }

  cargarFavoritos(): Article[] {
    return [];
  }

}
