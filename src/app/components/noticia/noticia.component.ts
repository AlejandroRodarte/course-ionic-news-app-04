import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

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
    private actionSheetController: ActionSheetController
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
          handler: () => {
            console.log('Compartir');
          }
        },
        {
          text: 'Favorito',
          icon: 'star',
          handler: () => {
            console.log('Favorito');
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

}
