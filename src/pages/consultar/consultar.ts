import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { RequestProvider } from '../../providers/request/request';

/**
 * Generated class for the ConsultarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar',
  templateUrl: 'consultar.html',
})
export class ConsultarPage {

  ocorrencias: any;
  listaOcorrencias: any;
  status: string = '';
  pesquisar: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public alert: AlertController, public http: HTTP, public requestService: RequestProvider) {

    this.ocorrencias = [];
    this.status = 'ocorrencias';

    var usuario = JSON.parse(sessionStorage.getItem("usuario"));
    var result = requestService.getOcorrencias({id_usuario: usuario.id});

    const load = loading.create({content: 'Aguarde...'});
    load.present();

    result.then((data)=>{
      load.dismiss();
      console.log(JSON.parse(data.data));
      this.ocorrencias = JSON.parse(data.data);
      this.listaOcorrencias = JSON.parse(data.data);
    })
    .catch((err)=> { load.dismiss(); });

  }


}
