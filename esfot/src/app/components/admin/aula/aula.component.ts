import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Aulas} from '../../../interfaces/aulas.interface';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  id: string;
  aula: Aulas = {
    nombreAula: "",
    descripcion: "",
    cupo: 0
  }

  constructor(private _adminServices: AdminService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._adminServices.getAula(this.id)
              .subscribe(
                resultado => {
                  this.aula = resultado;
                }
              );
          }
        }
      ); }

  ngOnInit() {
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevaAula(this.aula)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/aula', resultado.name]);
          }
        );
    } else {
      this._adminServices.editarAula(this.aula, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
          }
        );
    }
  }

  clean() {
    this.aula.nombreAula = '';
    this.aula.descripcion = '';
    this.aula.cupo = null;
  }
}
