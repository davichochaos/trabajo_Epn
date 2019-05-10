import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Docentes} from '../interfaces/docentes.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocentService {

  //docentes
  docentesURL: string = 'https://esfot-975af.firebaseio.com/docentes.json';
  docenteURL: string = 'https://esfot-975af.firebaseio.com/docentes';

  constructor(private _http: Http) { }
  isLogged(): Promise<boolean> {
    if (typeof(Storage) !== 'undefined') {
      let usuarioGuar;
      if (usuarioGuar =  localStorage.getItem('Docent')) {
        usuarioGuar = JSON.parse(usuarioGuar);
        document.getElementById('nombreDocen').innerHTML = usuarioGuar.nombreDocent;
        console.log(usuarioGuar);
        return Promise.resolve(true);

      }
    }
    return Promise.resolve(false);
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

  getUsuario(indice: string) {
    let url = `${this.docenteURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }
}
