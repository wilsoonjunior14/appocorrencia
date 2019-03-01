import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { OcorrenciaPage } from '../ocorrencia/ocorrencia';
import { ConsultarPage } from '../consultar/consultar';
import { EventosPage } from '../eventos/eventos';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = InicioPage;
  tab2Root: any = OcorrenciaPage;
  tab3Root: any = ConsultarPage;
  tab5Root: any = EventosPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
