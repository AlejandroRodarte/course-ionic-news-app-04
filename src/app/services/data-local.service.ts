import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private noticias: Article[] = [];

  public noticiasChanged = new Subject<void>();

  constructor(
    private storage: Storage
  ) { }

  eliminarNoticia(index: number): void {
    this.noticias.splice(index, 1);
    this.noticiasChanged.next();
  }

  guardarNoticia(noticia: Article): void {

    const existe = this.noticias.find((noticiaActual: Article) => noticia.title === noticiaActual.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
      this.noticiasChanged.next();
    }

  }

  async cargarFavoritos(): Promise<void> {

    const favoritos = await this.storage.get('favoritos') || [];
    this.noticias = favoritos;

    this.noticiasChanged.next();

  }

  getNoticias(): Article[] {
    return [...this.noticias];
  }

}
