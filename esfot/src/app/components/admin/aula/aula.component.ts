import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Aulas} from '../../../interfaces/aulas.interface';
import {Message} from 'primeng/api';


@Component({
  selector: 'app-aula',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit {

  id: string;
  aulas: Aulas[] = [];
  msgs: Message[] = [];
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
      );

    this._adminServices.consultarAulas()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.aulas.push(usuarioNew);
          }
          return this.aulas;
        }
      );
  }

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
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Aula o laboratorio guardado con exito'});
          }
        );
    } else {
      this._adminServices.editarAula(this.aula, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Aula o laboratorio editado con exito'});
          }
        );
    }
  }

  clean() {
    this.aula.nombreAula = '';
    this.aula.descripcion = '';
    this.aula.cupo = null;
  }

  mayus() {
    this.aula.nombreAula = this.aula.nombreAula.valueOf().toUpperCase();
  }

  controll() {
    let a = this.aula.nombreAula.valueOf().toUpperCase();

    for (let i = 0; i < this.aulas.length; i ++) {
      if (a === this.aulas[i].nombreAula) {
        console.log('la aula ya existe');
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error', detail: 'La aula o laboratorio ya existe'});
      }
    }
  }
}
