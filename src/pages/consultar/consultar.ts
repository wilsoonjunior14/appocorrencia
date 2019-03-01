import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { RequestProvider } from '../../providers/request/request';
import { Vibration } from '@ionic-native/vibration';

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
  ocorrencia: any;
  acompanhamentos: any;
  fotos: any;
  status: string = '';
  pesquisar: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public alert: AlertController, public http: HTTP,
    public requestService: RequestProvider, public vibration: Vibration) {

    this.ocorrencias = [];
    this.fotos = [];
    this.ocorrencia = {};
    this.acompanhamentos = [];
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

  search(event: any){

    this.pesquisar = event.target.value;
    this.pesquisar = this.pesquisar.toLowerCase();

    if( this.pesquisar.length == 0 ){
      this.listaOcorrencias = this.ocorrencias;
    }else{

      let length = this.pesquisar.length;
      this.listaOcorrencias = this.ocorrencias.filter((item)=>{

        if( item.endereco.substring(0, length).toLowerCase().localeCompare(this.pesquisar) == 0 ){
          return true;
        }

        return false;

      });

    }

  }

  voltar(){
    this.status = 'ocorrencias';
  }

  buscaFotos(ocorrencia){
    this.ocorrencia = ocorrencia;
    this.status = 'fotos';

    var load = this.loading.create({content: 'Aguarde...'});
    load.present();
    var result = this.requestService.getFotosOcorrencia({id_ocorrencia: ocorrencia.id});
    result.then((data) => {
      this.fotos = JSON.parse(data.data);
      this.fotos.forEach((item)=>{
        item.nome = this.requestService.image(item.nome);
      });
      load.dismiss();

      if( this.fotos.length == 0 ){
        const alerta = this.alert.create({title: 'Aviso', subTitle: 'Ocorrência não possui fotos', buttons: ['OK']});
        alerta.present();
        this.vibration.vibrate([1000,1000,1000]);
        this.status = 'ocorrencias';
      }

    });
  }

  buscaAcompanhamentos(ocorrencia){
    this.ocorrencia = ocorrencia;
    this.status = 'acompanhamentos';
    var result = this.requestService.getAcompanhamentos({id: this.ocorrencia.id});

    const load = this.loading.create({content: 'Aguarde...'});
    load.present();
    result.then((data) => {
      load.dismiss();
      this.acompanhamentos = JSON.parse(data.data);

      if( this.acompanhamentos.length == 0 ){
        const alert = this.alert.create({title: 'Aviso', subTitle: 'Ocorrência não possui acompanhamentos!', buttons: ['OK']});
        alert.present();
        this.status = 'ocorrencias';
      }
    });
  }


}
