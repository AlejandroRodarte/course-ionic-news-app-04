import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
    private inAppBrowser: InAppBrowser
  ) { }

  ngOnInit() {}

  abrirNoticia(): void {
    const browser = this.inAppBrowser.create(this.noticia.url, '_system');
  }

}
