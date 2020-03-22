import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input()
  public noticia: Article;

  @Input()
  public index: number;

  constructor(
    private inAppBrowser: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private noticiasService: NoticiasService,
    private toastController: ToastController,
    private platform: Platform
  ) { }

  ngOnInit() {}

  abrirNoticia(): void {
    const browser = this.inAppBrowser.create(this.noticia.url, '_system');
  }

  async lanzarMenu(): Promise<void> {

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          handler: () => this.compartirNoticia()
        },
        {
          text: this.noticiasService.favoriteMode === 'add' ? 'Favorito' : 'Eliminar de Favorito',
          icon: 'star',
          handler: () => {

            const changed = this.noticiasService.favoriteMode === 'add' ?
            this.dataLocalService.guardarNoticia(this.noticia) :
            this.dataLocalService.eliminarNoticia(this.index);

            if (!changed && this.noticiasService.favoriteMode === 'add') {
              this.presentToast('Esta noticia ya se encuentra en tus favoritos');
            } else if (changed && this.noticiasService.favoriteMode === 'add') {
              this.presentToast('Noticia agregada a favoritos');
            } else {
              this.presentToast('Noticia eliminada de favoritos');
            }

          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }
      ]
    });

    await actionSheet.present();

  }

  private async presentToast(message: string): Promise<void> {

    const toast = await this.toastController.create({
      message,
      duration: 1500
    });

    await toast.present();

  }

  compartirNoticia() {

    if (this.platform.is('cordova')) {

      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        '',
        this.noticia.url
      );

    // tslint:disable-next-line: no-string-literal
    } else if (navigator['share']) {

      // tslint:disable-next-line: no-string-literal
      navigator['share']({
        title: this.noticia.title,
        text: this.noticia.description,
        url: this.noticia.url
      })
      .then(() => console.log('Share exitoso'))
      .catch(() => console.log('Share fallado'));

    } else {
      console.log('Share no soportado');
    }


  }

}
