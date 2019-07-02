import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Carreras} from '../../../interfaces/carreras.interface';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {
  id: string;
  msgs: Message[] = [];

  carreras: Carreras[] = [];

  carrera: Carreras = {
    nombreCarr: "",
    siglas: "",
  }

  constructor(private _adminServices: AdminService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._adminServices.getCarrera(this.id)
              .subscribe(
                resultado => {
                  this.carrera = resultado;
                }
              );
          }
        }
      );

    this._adminServices.consultarCarreras()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.carreras.push(usuarioNew);
          }
          return this.carreras;
        }
      );
  }

  ngOnInit() {
  }

  mayus() {
    this.carrera.nombreCarr = this.carrera.nombreCarr.valueOf().toUpperCase();
    this.carrera.siglas = this.carrera.siglas.valueOf().toUpperCase();
  }

  controll() {
    let a = this.carrera.siglas.valueOf().toUpperCase();
    let b = this.carrera.nombreCarr.valueOf().toUpperCase();

    for ( let i = 0; i < this.carreras.length; i ++) {
      if (b === this.carreras[i].nombreCarr ||
      a === this.carreras[i].siglas) {
        console.log('la carrera ya existe');
      }
    }
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevoCarrera(this.carrera)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/carrera', resultado.name]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Carrera guardada con exito'});
          }
        );
    } else {
      this._adminServices.editarCarrera(this.carrera, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Carrera editada con exito'});
          }
        );
    }
  }

  clean() {
    this.carrera.nombreCarr = '';
    this.carrera.siglas = '';
  }

}
