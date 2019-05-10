import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Carreras} from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {
  id: string;
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
  }

  ngOnInit() {
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevoCarrera(this.carrera)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/carrera', resultado.name]);
          }
        );
    } else {
      this._adminServices.editarCarrera(this.carrera, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
          }
        );
    }
  }

  clean() {
    this.carrera.nombreCarr = '';
    this.carrera.siglas = '';
  }

}
