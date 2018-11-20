import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Materias} from '../../../interfaces/materias.interface';
import {Carreras} from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  carrerass: Carreras[] = [];

  id: string;
  materia: Materias = {
    nombreMat: '',
    codigo: '',
    creditos: 0,
    semestre: 0,
    carreras: [],
  }

  constructor(private _adminServices: AdminService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._adminServices.getMateria(this.id)
              .subscribe(
                resultado => {
                  this.materia = resultado;
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
            this.carrerass.push(usuarioNew);
          }
          return this.carrerass;
        }
      );
  }

  ngOnInit() {
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevaMateria(this.materia)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/materia', resultado.name]);
          }
        );
    } else {
      this._adminServices.editarMateria(this.materia, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
          }
        );
    }
  }

}
