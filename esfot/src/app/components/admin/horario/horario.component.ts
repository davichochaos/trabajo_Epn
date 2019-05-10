import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import { Aulas } from '../../../interfaces/aulas.interface';
import {AdminService} from '../../../services/admin.service';
import {Horarios} from '../../../interfaces/horarios.interface'
import {Materias} from '../../../interfaces/materias.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Docentes} from '../../../interfaces/docentes.interface';
import {Carreras} from '../../../interfaces/carreras.interface';
import {el} from '@angular/platform-browser/testing/src/browser_util';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  id: string;
  carrer: Carreras[] = [];
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
    semest: null,
    carrer: ''
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

    this._adminService.consultarHorarios()
      .subscribe(
        res => {
          for (const key$ in res) {
            const horarioNew = res[key$];
            horarioNew.id = key$;
            this.horarios.push(horarioNew);
          }
          return this.horarios;
        }
      );

    this._adminService.consultarCarreras()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.carrer.push(usuarioNew);
          }
          return this.carrer;
        }
      );
  }

  flltro() {
    this._adminService.consultarMaterias()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const materiaNew = resultados[key$];
            materiaNew.id = key$;
            if (materiaNew.carreras.length >= [1]) {
              for (let i = 0; i < materiaNew.carreras.length; i++) {
                if (materiaNew.carreras[i] == this.horario.carrer && materiaNew.semestre == this.horario.semest) {
                  this.materias = [];
                  this.materias.push(materiaNew);
                }
              }
            }
            console.log(this.materias.length);
          }
        }
      );

  }

  clean() {
    this.horario.dias = [];
    this.horario.nombreMat = '';
    this.horario.docenteNom = '';
    this.horario.nombreAula = '';
    this.horario.horaInicios = [];
    this.horario.horaFins = [];
    this.horario.semest =  null;
    this.horario.carrer = '';
  }

  ngOnInit() {
  }

  //rstrincciones
  //1. Hora finalizada menor a la hora de inicio y
  // segunda horario empezar desde la hora finalizada de la anterior

  hora2() {
    //let text= (<HTMLInputElement> document.getElementById("inicio")).value.replace(':','0');
    let ini = (document.getElementById("inicio") as HTMLInputElement).value.replace(':','0');
    let fin = (document.getElementById("fin")as HTMLInputElement).value.replace(':','0');
    let ini1 = (document.getElementById("inicio1") as HTMLInputElement).value.replace(':','0');
    let fin1 = (document.getElementById("fin1")as HTMLInputElement).value.replace(':','0');
    let ini2 = (document.getElementById("inicio2") as HTMLInputElement).value.replace(':','0');
    let fin2 = (document.getElementById("fin2")as HTMLInputElement).value.replace(':','0');
    let ini3 = (document.getElementById("inicio3") as HTMLInputElement).value.replace(':','0');
    let fin3 = (document.getElementById("fin3")as HTMLInputElement).value.replace(':','0')
    let ini4 = (document.getElementById("inicio4") as HTMLInputElement).value.replace(':','0');
    let fin4 = (document.getElementById("fin4")as HTMLInputElement).value.replace(':','0');
    let ini5 = (document.getElementById("inicio5") as HTMLInputElement).value.replace(':','0');
    let fin5 = (document.getElementById("fin5")as HTMLInputElement).value.replace(':','0');

    if (Date.parse(ini) >= Date.parse(fin) || Date.parse(ini1) >= Date.parse(fin1) ||
        Date.parse(ini2) >= Date.parse(fin2) || Date.parse(ini3) >= Date.parse(fin3) ||
        Date.parse(ini4) >= Date.parse(fin4) || Date.parse(ini5) >= Date.parse(fin5)) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Hora final es inferior a hora de inicio'});
    }

    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total;

    if (this.cod == false || this.cod1 == false || this.cod2 == false || this.cod3 == false || this.cod4 == false || this.cod5 == false) {
      total1 = +fin - +ini;
      total2 = +fin1 - +ini1;
      total3 = +fin2 - +ini2;
      total4 = +fin3 - +ini3;
      total5 = +fin4 - +ini4;
      total6 = +fin5 - +ini5;
      total = (+total1 + +total2 + +total3 + +total4 + +total5 + +total6).toString().split("")[0];
      console.log('total: ', total);
      for (let i = 0; i < this.materias.length; i++) {
        if (this.materias[i].nombreMat == this.horario.nombreMat) {
            if ( +total == this.materias[i].creditos || +total == this.materias[i].totalHoras) {
              this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Horas correctas'});
            } else {
              this.msgs = [];
              this.msgs.push({severity: 'error', summary: 'Error', detail: 'Horas incorrectas'});
            }

        }
      }

    }
  }

  cruze() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.horario.dias[0]) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[0] ||
                this.horario.horaInicios[0] < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  cruze1() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.horario.dias[1]) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[1] ||
                this.horario.horaInicios[1] < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  cruze2() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.horario.dias[2]) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[2] ||
                this.horario.horaInicios[2] < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  cruze3() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.horario.dias[3]) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[3] ||
                this.horario.horaInicios[3] < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  cruze4() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.horario.dias[4]) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[4] ||
                this.horario.horaInicios[4] < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  cruze5() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.horario.nombreAula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.horario.dias[5]) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[5] ||
                this.horario.horaInicios[5] < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  guardar() {
    if (this.id == 'nuevo') {
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
    }

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
        this.horario.horaInicios[0] = null;
        this.horario.horaFins[0] = null;
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
        this.horario.horaInicios[1] = null;
        this.horario.horaFins[1] = null;
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
        this.horario.horaInicios[2] = null;
        this.horario.horaFins[2] = null;
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
        this.horario.horaInicios[3] = null;
        this.horario.horaFins[3] = null;
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
        this.horario.horaInicios[4] = null;
        this.horario.horaFins[4] = null;
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
        this.horario.horaInicios[5] = null;
        this.horario.horaFins[5] = null;
        this.cod5 = true;

        break;
      default:
        console.log("hola");
    }
  }

  /**/
}
