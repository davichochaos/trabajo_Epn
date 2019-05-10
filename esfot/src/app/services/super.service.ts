import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Docentes} from '../interfaces/docentes.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperService {

  //docentes
  docentesURL: string = 'https://esfot-975af.firebaseio.com/docentes.json';
  docenteURL: string = 'https://esfot-975af.firebaseio.com/docentes';

  //carreras
  carrerasURL: string = 'https://esfot-975af.firebaseio.com/carreras.json';
  carreraURL: string = 'https://esfot-975af.firebaseio.com/carreras';

  constructor(private _http: Http) { }
  isLogged(): Promise<boolean> {
    if (typeof(Storage) !== 'undefined') {
      let usuarioGuar;
      if (usuarioGuar =  localStorage.getItem('Super')) {
        usuarioGuar = JSON.parse(usuarioGuar);
        document.getElementById('nombreSuper').innerHTML = usuarioGuar.nombreDocent;
        //console.log(usuarioGuar);
        return Promise.resolve(true);

      }
    }
    return Promise.resolve(false);
  }

  //docentes
  consultarUsuarios() {
    return this._http.get(this.docentesURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }

  nuevoUsuario(usuario: Docentes) {
    let body = JSON.stringify(usuario);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.docentesURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getUsuario(indice: string) {
    let url = `${this.docenteURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editarUsuario(usuario: Docentes, id: string) {
    const body = JSON.stringify(usuario);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.docenteURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  eliminarUsuario(key$: string) {
    const url = `${this.docenteURL}/${key$}.json`;
    return this._http.delete(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  //carreras
  consultarCarreras() {
    return this._http.get(this.carrerasURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }

}
