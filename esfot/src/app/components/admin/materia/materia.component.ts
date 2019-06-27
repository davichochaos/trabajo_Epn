import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Materias} from '../../../interfaces/materias.interface';
import {Carreras} from '../../../interfaces/carreras.interface';
import {Message} from 'primeng/api';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  carrerass: Carreras[] = [];
  msgs: Message[] = [];

  id: string;
  materia: Materias = {
    nombreMat: '',
    codigo: '',
    creditos: null,
    cd: null,
    cp: null,
    totalHoras: null,
    semestre: 0,
    carreras: [],
  }

  carreraAntigua: boolean = false;
  carreraNueva: boolean = false;

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

  clean() {
    this.materia.nombreMat = '';
    this.materia.codigo = '';
    this.materia.creditos = null;
    this.materia.cd = null;
    this.materia.cp = null;
    this.materia.totalHoras = null;
    this.materia.semestre = 0;
    this.materia.carreras = [];
  }

  suma() {
    if (this.carreraNueva = true) {
      let cd = +(document.getElementById("cd")as HTMLInputElement).value;
      let cp = +(document.getElementById("cp")as HTMLInputElement).value;
      let total = cd + cp;
      this.materia.totalHoras = total;
      return this.materia.totalHoras ;
      console.log(this.materia.totalHoras);
    } else {
      console.log("materia antigua");
    }
    let cd = +(document.getElementById("cd")as HTMLInputElement).value;
    let cp = +(document.getElementById("cp")as HTMLInputElement).value;
    let total = cd + cp;
    this.materia.totalHoras = total;
    console.log(this.materia.totalHoras);
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevaMateria(this.materia)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/materia', resultado.name]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Materia guardada con exito'});
          }
        );
    } else {
      this._adminServices.editarMateria(this.materia, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Materia editada con exito'});
          }
        );
    }
  }

  subjects() {
    if (this.materia.carreras.length != 0) {
      for (let i = 0; i < this.materia.carreras.length; i++){
        /*if (this.materia.carreras[i] === 'ASI' || this.materia.carreras[i] === 'ASA'
          || this.materia.carreras[i] === 'EM' || this.materia.carreras[i] === 'ET'){

          if (this.carreraAntigua === false){
            this.carreraAntigua = true;
          }
        }else if (this.materia.carreras[i] === 'TSD' ){
          if (this.carreraNueva === false){
            this.carreraNueva = true;
          }
        }*/

        if (this.materia.carreras[i] === 'ASI' || this.materia.carreras[i] === 'ASA'
          || this.materia.carreras[i] === 'EM' || this.materia.carreras[i] === 'ET') {
          console.log(this.materia.carreras[i])
          this.carreraNueva = false;
        } else {
          this.carreraNueva = true;
          this.suma();
        }
      }

      /*if (this.carreraAntigua && this.carreraNueva){
        console.log('se han 2')
      }else if (this.carreraAntigua){
        console.log('Carrera antigua')
      }else if (this.carreraNueva){
        console.log('Carrera nueva')
      }
    } else{
      this.carreraNueva=false;
      this.carreraAntigua=false;
    }*/
    }
  }
}
