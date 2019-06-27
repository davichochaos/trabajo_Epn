import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Docentes } from '../interfaces/docentes.interface';
import { Materias } from '../interfaces/materias.interface';
import { Aulas } from '../interfaces/aulas.interface';
import { Carreras } from '../interfaces/carreras.interface';
import { Horarios } from '../interfaces/horarios.interface';
import {Reservas} from '../interfaces/reservas.interface';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //aulas
  aulasURL: string = 'https://esfot-975af.firebaseio.com/aulas.json';
  aulaURL: string = 'https://esfot-975af.firebaseio.com/aulas';

  //carreras
  carrerasURL: string = 'https://esfot-975af.firebaseio.com/carreras.json';
  carreraURL: string = 'https://esfot-975af.firebaseio.com/carreras';

  //docentes
  docentesURL: string = 'https://esfot-975af.firebaseio.com/docentes.json';
  docenteURL: string = 'https://esfot-975af.firebaseio.com/docentes';

  //horarios
  horariosURL: string = 'https://esfot-975af.firebaseio.com/horarios.json';
  horarioURL: string = 'https://esfot-975af.firebaseio.com/horarios';

  //materias
  materiasURL: string = 'https://esfot-975af.firebaseio.com/materias.json';
  materiaURL: string = 'https://esfot-975af.firebaseio.com/materias';

  //reservas
  reservasURL: string = 'https://esfot-975af.firebaseio.com/reservas.json';
  reservaURL: string = 'https://esfot-975af.firebaseio.com/reservas';

  constructor(private _http: Http, private http: HttpClient) {}

  isLogged(): Promise<boolean> {
    if (typeof(Storage) !== 'undefined') {
      let usuarioGuar;
      if (usuarioGuar =  localStorage.getItem('Admin')) {
        usuarioGuar = JSON.parse(usuarioGuar);
        document.getElementById('nombreDocent').innerHTML = usuarioGuar.nombreDocent;
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

  //aulas
  consultarAulas() {
    return this._http.get(this.aulasURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }

  nuevaAula(aula: Aulas) {
    let body = JSON.stringify(aula);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.aulasURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getAula(indice: string) {
    let url = `${this.aulaURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editarAula(aula: Aulas, id: string) {
    const body = JSON.stringify(aula);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.aulaURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  eliminarAula(key$: string) {
    const url = `${this.aulaURL}/${key$}.json`;
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

  nuevoCarrera(carrera: Carreras) {
    let body = JSON.stringify(carrera);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.carrerasURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getCarrera(indice: string) {
    let url = `${this.carreraURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editarCarrera(carrera: Carreras, id: string) {
    const body = JSON.stringify(carrera);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.carreraURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  eliminarCarrera(key$: string) {
    const url = `${this.carreraURL}/${key$}.json`;
    return this._http.delete(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  //horarios
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

  nuevoHorario(horario: Horarios) {
    let body = JSON.stringify(horario);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.horariosURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getHorario(indice: string) {
    let url = `${this.horarioURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editarHorario(horario: Horarios, id: string) {
    const body = JSON.stringify(horario);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.horarioURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  eliminarHorario(key$: string) {
    const url = `${this.horarioURL}/${key$}.json`;
    return this._http.delete(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  //materias
  consultarMaterias() {
    return this._http.get(this.materiasURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }

  nuevaMateria(materia: Materias) {
    let body = JSON.stringify(materia);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.materiasURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getMateria(indice: string) {
    let url = `${this.materiaURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editarMateria(materia: Materias, id: string) {
    const body = JSON.stringify(materia);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.materiaURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  eliminarMateria(key$: string) {
    const url = `${this.materiaURL}/${key$}.json`;
    return this._http.delete(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }


  //reservas
  consultarReserva() {
    return this._http.get(this.reservasURL)
      .pipe(
        map(
          respuesta => {
            return  respuesta.json();
          }
        )
      );
  }

  nuevaReserva(reserva: Reservas) {
    let body = JSON.stringify(reserva);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this._http.post(this.reservasURL, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  getReserva(indice: string) {
    let url = `${this.reservaURL}/${ indice }.json`;
    return this._http.get(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  editaraReserva(reserva: Reservas, id: string) {
    const body = JSON.stringify(reserva);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const url = `${this.reservaURL}/${id}.json`;
    return this._http.put(url, body, {headers: headers})
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }

  eliminarReserva(key$: string) {
    const url = `${this.reservaURL}/${key$}.json`;
    return this._http.delete(url)
      .pipe(map(
        resultado => {
          return resultado.json();
        }
      ));
  }
}
