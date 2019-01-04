import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { OcorrenciaPage } from '../ocorrencia/ocorrencia';
import { ConsultarPage } from '../consultar/consultar';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  icon: boolean = false;
  posicao: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP, public loading: LoadingController, public geolocation: Geolocation,
  public alert: AlertController) {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.icon = true;
      this.posicao = resp.coords.accuracy;
      sessionStorage.setItem("latitude", ""+resp.coords.latitude+"");
      sessionStorage.setItem("longitude", ""+resp.coords.longitude+"");
      console.log(sessionStorage.getItem("latitude"));
      console.log(sessionStorage.getItem("longitude"));
    })
    .catch((error) => {
      this.icon = false;
      console.log(error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data)=>{
      this.icon = true;
      this.posicao = data.coords.accuracy;
      sessionStorage.setItem("latitude", ""+data.coords.latitude+"");
      sessionStorage.setItem("longitude", ""+data.coords.longitude+"");
      console.log(sessionStorage.getItem("latitude"));
      console.log(sessionStorage.getItem("longitude"));
    });

  }

  novaOcorrencia(){
    if( this.icon != true ){
      const alerta = this.alert.create({title: 'Aviso', subTitle: 'Você precisa habilitar seu GPS!', buttons: ['OK']});
      alerta.present();
    }else{
      this.navCtrl.push(OcorrenciaPage);
    }
  }

  consultar(){
    this.navCtrl.push(ConsultarPage);
  }


}
