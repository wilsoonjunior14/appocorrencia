import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { TabsPage } from '../tabs/tabs';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string = 'wjunior_msn@hotmail.com';
  senha: string = '123';

  constructor(public navCtrl: NavController, public http: HTTP, public loading: LoadingController, public alert: AlertController, public requestProvider: RequestProvider) {

    let usuario = sessionStorage.getItem("usuario");
    if( usuario != null && usuario != undefined ){
      this.navCtrl.setRoot(InicioPage);
    }

  }

  entrar(){

    var retorno = this.validar();
    if( retorno.status == false ){

      const msg = this.alert.create({title: 'Aviso', subTitle: retorno.msg, buttons: ['OK']});
      msg.present();

    }else{

      const load = this.loading.create({content: 'Aguarde...'});
      load.present();

      var result = this.requestProvider.autenticar(this.email, this.senha);
      result.then((data) => {
        load.dismiss();
        var response = JSON.parse(data.data);
        if( response.status == false ){
          const msg = this.alert.create({title: 'Aviso', subTitle: response.mensagem, buttons:['OK']});
          msg.present();
        }else{
          sessionStorage.setItem("usuario", JSON.stringify(response.data));
          this.navCtrl.setRoot(TabsPage);
        }
      })
      .catch((error)=>{ load.dismiss(); });

      //this.navCtrl.setRoot(InicioPage);

    }
  }

  validar(){

    var retorno = {status: true, msg: ''};

    if( this.email.length <= 0 || this.email.length > 255 ){
      retorno.status = false;
      retorno.msg = 'Email deve conter até 255 caracteres!';
    }

    if( this.senha.length <= 0 || this.senha.length > 255 ){
      retorno.status = false;
      retorno.msg = 'Senha deve conter até 255 caracteres';
    }

    return retorno;

  }

}
