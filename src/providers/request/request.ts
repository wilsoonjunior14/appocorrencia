import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequestProvider {

  URL: string = "http://192.168.5.86/participasol/";

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

}
