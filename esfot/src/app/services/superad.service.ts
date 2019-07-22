import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Administrador} from '../interfaces/administrador.interface';


@Injectable({
  providedIn: 'root'
})
export class SuperadService {

  //admins
  adminsURL: string = 'https://esfot-975af.firebaseio.com/administradores.json';
  adminURL: string = 'https://esfot-975af.firebaseio.com/administradores';

  //horarios
  horariosURL: string = 'https://esfot-975af.firebaseio.com/horarios.json';

  constructor(private _http: Http, private http: HttpClient) { }

  isLogged(): Promise<boolean> {
    if (typeof(Storage) !== 'undefined') {
      let usuarioGuar;
      if (usuarioGuar =  localStorage.getItem('Super')) {
        usuarioGuar = JSON.parse(usuarioGuar);
        document.getElementById('nombreSuper').innerHTML = usuarioGuar.nombreDocent;
        return Promise.resolve(true);
      }
    }
    return Promise.resolve(false);
  }

  consultarAdmins() {
    return this._http.get(this.adminsURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }

  eliminarAdmin(key$: string) {
    const url = `${this.adminURL}/${key$}.json`;
    return this._http.delete(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getAdmin(indice: string) {
    let url = `${this.adminURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editarAdmin(admin: Administrador, id: string) {
    const body = JSON.stringify(admin);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.adminURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  nuevoAdmin(admin: Administrador) {
    let body = JSON.stringify(admin);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.adminsURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }


  consultarHorarios() {
    return this._http.get(this.horariosURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }
}
