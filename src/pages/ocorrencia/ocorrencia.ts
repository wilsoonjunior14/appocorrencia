import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoadingController } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { InputMaskModule } from 'ionic-input-mask';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { InicioPage } from '../inicio/inicio';

/**
 * Generated class for the OcorrenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencia',
  templateUrl: 'ocorrencia.html',
})
export class OcorrenciaPage {

  bairros: any;
  ocorrencia: any;
  fotos: any;
  tipos: any;
  status: string= '';

  constructor(public navCtrl: NavController, public requestService: RequestProvider,
    public navParams: NavParams, public http: HTTP, public loading: LoadingController, public alert: AlertController, private camera: Camera) {

    var usuario = JSON.parse(sessionStorage.getItem("usuario"));

    this.requestService.getBairros();

    let load = this.loading.create({content: 'Aguarde...'});

    this.ocorrencia = {enderecoGPS:'', complemento: '', idusuario: usuario.id};
    this.ocorrencia.latitude = sessionStorage.getItem("latitude");
    this.ocorrencia.longitude = sessionStorage.getItem("longitude");

    this.fotos = [];
    load.present();

    var result = requestService.getBairros();
    result.then((data) => { this.bairros = JSON.parse(data.data); });
    var result2 = requestService.getTiposOcorrencia();
    result2.then((data) => { this.tipos = JSON.parse(data.data); load.dismiss(); });

    this.status = 'insertOcorrencia';
  }

  salvar(){

    var check = this.validar();
    if( check.status == false ){
      const alerta = this.alert.create({title: 'Aviso', subTitle: check.mensagem, buttons: ['OK']});
      alerta.present();
    }else{

      var result = this.requestService.addOcorrencia(this.ocorrencia);
      var load = this.loading.create({content: 'Aguarde'});
      load.present();
      result.then((data) => {
        this.ocorrencia = JSON.parse(data.data);

        if( this.ocorrencia.id != undefined ){
          var alerta = this.alert.create({title: 'Aviso', subTitle: 'Ocorrência cadastrada com sucesso! Agora, você pode anexar fotos ou não referente a ocorrência.', buttons: ['OK']});
          alerta.present();
        }

        load.dismiss();
      });

      this.status = 'insertFotos';

    }
  }

  capturar(){
    const options = {
      quality: 100,
      targetWidth: 500,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((data)=>{
      let img = data;
      let id = this.fotos.length;

      this.requestService.enviarFoto({img: img, descricao: '', ocorrencia_id: this.ocorrencia.id})
      .then((data)=>{
        let foto = JSON.parse(data.data);
        foto.img = this.requestService.image(foto.nome);
        this.fotos.push(foto);
      });

    })
  }

  removeFoto(image){
    this.fotos = this.fotos.filter((item)=>{
      return item.id != image.id;
    });
  }

  finalizar(){
    const alerta = this.alert.create({title: 'Aviso', subTitle: 'Ocorrência registrada com sucesso!', buttons: ['OK']});
    alerta.present();
    this.navCtrl.setRoot(InicioPage);
  }

  validar(){

    var response = {status: true, mensagem: ''};

    if( this.ocorrencia.descricao == undefined || this.ocorrencia.descricao.length > 255 || this.ocorrencia.descricao.length == 0 ){
      response.status = false;
      response.mensagem = "Descrição inválida! Deve conter até 255 caracteres";
      return response;
    }

    if( this.ocorrencia.endereco == undefined || this.ocorrencia.endereco.length > 255 || this.ocorrencia.endereco.length == 0 ){
      response.status = false;
      response.mensagem = "Endereço inválido! Deve conter até 255 caracteres";
      return response;
    }

    if( this.ocorrencia.cep == undefined || this.ocorrencia.cep.length > 10 || this.ocorrencia.cep.length == 0 ){
      response.status = false;
      response.mensagem = "CEP inválido! Deve conter até 10 caracteres";
      return response;
    }

    if( this.ocorrencia.bairro == undefined || this.ocorrencia.bairro.length == "" ){
      response.status = false;
      response.mensagem = "Bairro não selecionado!";
      return response;
    }

    if( this.ocorrencia.tipofoto == undefined || this.ocorrencia.tipofoto.length == "" ){
      response.status = false;
      response.mensagem = "Bairro não selecionado!";
      return response;
    }

    return response;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcorrenciaPage');
  }

}
