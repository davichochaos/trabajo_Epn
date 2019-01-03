import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import { Aulas } from '../../../interfaces/aulas.interface';
import {AdminService} from '../../../services/admin.service';
import {Horarios} from '../../../interfaces/horarios.interface'
import {Materias} from '../../../interfaces/materias.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Docentes} from '../../../interfaces/docentes.interface';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  id: string;
  msgs: Message[] = [];
  aulas: Aulas[] = [];
  materias: Materias[] = [];
  docentes: Docentes[] = [];
  horarios: Horarios[] = [];
  horario: Horarios = {
    dias: [],
    nombreMat: '',
    docenteNom: '',
    nombreAula: '',
    horaInicios: [],
    horaFins: [],
  }


  constructor(private _adminService: AdminService, private _router: Router,
              private _activatedRoute: ActivatedRoute ) {

    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._adminService.getHorario(this.id)
              .subscribe(
                resultado => {
                  this.horario = resultado;
                }
              );
          }
        }
      );

    this._adminService.consultarAulas()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const aulaNew = resultados[key$];
            aulaNew.id = key$;
            this.aulas.push(aulaNew);
          }
          return this.aulas;
        }
      );

    this._adminService.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const docentNew = resultados[key$];
            docentNew.id = key$;
            this.docentes.push(docentNew);
          }
          return this.docentes;
        }
      );

    this._adminService.consultarMaterias()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const aulaNew = resultados[key$];
            aulaNew.id = key$;
            this.materias.push(aulaNew);
          }
          return this.materias;
        }
      );

    this._adminService.consultarHorarios()
      .subscribe(
        res => {
          for (const key$ in res) {
            const horarioNew = res[key$];
            horarioNew.id = key$;
            this.horarios.push(horarioNew);
          }
          console.log(this.horarios);
          return this.horarios;
        }
      );
  }

  ngOnInit() {
  }

  //rstrincciones
  //1. Hora finalizada menor a la hora de inicio y
  // sugunda horario empezar desde la hora finalizada de la anterior

  hora2() {
    //let text= (<HTMLInputElement> document.getElementById("inicio")).value.replace(':','0');
    let horaDesde = (document.getElementById("inicio") as HTMLInputElement).value.replace(':','0');
    let horaHasta = (document.getElementById("fin")as HTMLInputElement).value.replace(':','0');
    let horaDesde1 = (document.getElementById("inicio1") as HTMLInputElement).value.replace(':','0');
    let horaHasta1 = (document.getElementById("fin1")as HTMLInputElement).value.replace(':','0');
    let horaDesde2 = (document.getElementById("inicio2") as HTMLInputElement).value.replace(':','0');
    let horaHasta2 = (document.getElementById("fin2")as HTMLInputElement).value.replace(':','0');
    let horaDesde3 = (document.getElementById("inicio3") as HTMLInputElement).value.replace(':','0');
    let horaHasta3 = (document.getElementById("fin3")as HTMLInputElement).value.replace(':','0')
    let horaDesde4 = (document.getElementById("inicio4") as HTMLInputElement).value.replace(':','0');
    let horaHasta4 = (document.getElementById("fin4")as HTMLInputElement).value.replace(':','0');
    let horaDesde5 = (document.getElementById("inicio5") as HTMLInputElement).value.replace(':','0');
    let horaHasta5 = (document.getElementById("fin5")as HTMLInputElement).value.replace(':','0')

    if (Date.parse(horaDesde) >= Date.parse(horaHasta) || Date.parse(horaDesde1) >= Date.parse(horaHasta1) ||
        Date.parse(horaDesde2) >= Date.parse(horaHasta2) || Date.parse(horaDesde3) >= Date.parse(horaHasta3) ||
        Date.parse(horaDesde4) >= Date.parse(horaHasta4) || Date.parse(horaDesde5) >= Date.parse(horaHasta5)) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Hora final es inferior a hora de inicio'});

    }
    /*if (this.cod1 == false || this.cod2 == false || this.cod3 == false || this.cod4 == false) {
      if (Date.parse(horaDesde1) != Date.parse(horaHasta) || Date.parse(horaDesde1) != Date.parse(horaHasta) || Date.parse(horaDesde1) != Date.parse(horaHasta) ) {
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error', detail:'Hora de inicio incorrecta'});
      } else {
        //console.log('todo');
      }
    }*/

  }

  materiasAsig() {
    let mat = (document.getElementById("mat")as HTMLInputElement).value;
    let mat1 = (document.getElementById("mat1") as HTMLInputElement).value;
    let mat2 = (document.getElementById("mat2")as HTMLInputElement).value;
    if ( mat === mat1 || mat === mat2 || mat1 === mat2) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Materia ya asignada, esooja otra por favor'});
    }
  }

  guardar() {

    /*console.log(this.horarios.length);*/
    for (let i = 0; i < this.horarios.length; i++) {
      //console.log(this.horarios[i].nombreAula);
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        for (let j = 0; j < 7; j++) {
          console.log("aula igual");
          if (this.horarios[i].dias[j] == this.horario.dias[j]) {
            for (let k = 0; k < 7; k++) {
              console.log("dia igual");
              if (this.horarios[i].horaFins[k] > this.horario.horaInicios[k]) {
                for (let l = 0; l < 7; l++) {
                  console.log("hora inicio incorrecta");
                  if (this.horarios[i].docenteNom[l] == this.horario.docenteNom[l]) {
                    for (let m = 0; m < 7; m++) {
                      console.log("docente igual");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }



    /*if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminService.nuevoHorario(this.horario)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/horarioadmin', resultado.name]);
          }
        );
    } else {
      this._adminService.editarHorario(this.horario, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
          }
        );
    }*/

  }

  cod: boolean = true;
  cod1: boolean = true;
  cod2: boolean = true;
  cod3: boolean = true;
  cod4: boolean = true;
  cod5: boolean = true;

// activaciones de inputs a traves de checkbox
  val() {
    switch (this.cod) {
      case true:
        this.horario.dias[0] = 'Lunes';
        this.cod = false;

        break;
      case false:
        this.horario.dias[0] = null;
        this.cod = true;

        break;
      default:
        console.log("hola");
    }
  }

  val1() {
    switch (this.cod1) {
      case true:
        this.horario.dias[1] = 'Martes';
        this.cod1 = false;

        break;
      case false:
        this.horario.dias[1] = null;
        this.cod1 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val2() {
    switch (this.cod2) {
      case true:
        this.horario.dias[2] = 'Miercoles';
        this.cod2 = false;

        break;
      case false:
        this.horario.dias[2] = null;
        this.cod2 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val3() {
    switch (this.cod3) {
      case true:
        this.horario.dias[3] = 'Jueves';
        this.cod3 = false;

        break;
      case false:
        this.horario.dias[3] = null;
        this.cod3 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val4() {
    switch (this.cod4) {
      case true:
        this.horario.dias[4] = 'Viernes';
        this.cod4 = false;

        break;
      case false:
        this.horario.dias[4] = null;
        this.cod4 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val5() {
    switch (this.cod5) {
      case true:
        this.horario.dias[5] = 'Sabado';
        this.cod5 = false;

        break;
      case false:
        this.horario.dias[5] = null;
        this.cod5 = true;

        break;
      default:
        console.log("hola");
    }
  }

  /**/
}
