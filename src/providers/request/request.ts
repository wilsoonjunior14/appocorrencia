import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  SERVER: string = "http://192.168.5.86";
  URL: string = this.SERVER+"/participasol/";
  IMAGE: string = this.SERVER+"/FOTOS/";

  constructor(public http: HTTP) {
  }

  autenticar(email, senha){
    return this.http.post(this.URL+"login/autenticar/", {email: email, senha: senha}, {});
  }

  getBairros(){
    return this.http.get(this.URL+"bairro", {}, {});
  }

  getTiposOcorrencia(){
    return this.http.get(this.URL+"tipoFoto/buscaTipos", {}, {});
  }

  addOcorrencia(ocorrencia){
    return this.http.post(this.URL+"ocorrencia/addOcorrencia", ocorrencia, {});
  }

  enviarFoto(foto){
    return this.http.post(this.URL+"fotos/enviarfotos", foto, {});
  }

  image(name){
    return this.IMAGE+name;
  }

  getOcorrencias(data){
    return this.http.post(this.URL+"ocorrencia/ocorrenciasUsuario", data, {});
  }

  getFotosOcorrencia(data){
    return this.http.post(this.URL+"ocorrencia/fotos", data, {});
  }

  getAcompanhamentos(data){
    return this.http.get(this.URL+"acompanhamento/buscaAcompanhamento/"+data.id, {}, {});
  }

}
