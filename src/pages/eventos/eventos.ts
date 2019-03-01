import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { RequestProvider } from '../../providers/request/request';
import { LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  eventos: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, public loading: LoadingController, public alert: AlertController, public requestProvider: RequestProvider) {
  }

  ionViewDidLoad() {

    const alerta = this.alert.create({title: 'Aviso', subTitle: 'Erro de conexão com o servidor.', buttons: ['Ok']});
    const load = this.loading.create({content: 'Aguarde...'});
    load.present();

    this.requestProvider.getEventos().then((data)=>{
      this.eventos = JSON.parse(data.data);
      load.dismiss();
    }).catch((err)=>{
      console.log(err);
      load.dismiss();
      alerta.present();
    });


  }



}
