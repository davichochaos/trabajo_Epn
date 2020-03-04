import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/api';
import {Aulas} from '../../../interfaces/aulas.interface';
import {AdminService} from '../../../services/admin.service';
import {Horarios} from '../../../interfaces/horarios.interface';
import {Materias} from '../../../interfaces/materias.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Docentes} from '../../../interfaces/docentes.interface';
import {Carreras} from '../../../interfaces/carreras.interface';
import {angularCoreEnv} from '@angular/core/src/render3/jit/environment';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  // Variables globales
  permision: boolean = false;
  correct: boolean;
  id: string;
  credi: boolean = false;
  cdCP: boolean = false;
  creditosM: any;
  cds: any;
  cps: any;

  // Datos de BDD
  materias1: Materias[] = [];
  carrer: Carreras[] = [];
  msgs: Message[] = [];
  aulas: Aulas[] = [];
  profes: Docentes[] = [];
  horarios: Horarios[] = [];
  horario: Horarios = {
    dias: [],
    nombreMat: '',
    docenteNom: '',
    nombreAula: [],
    horaInicios: [],
    horaFins: [],
    semest: null,
    carrer: '',
    paralelo: ''
  };


  constructor(private _adminService: AdminService, private _router: Router,
              private _activatedRoute: ActivatedRoute) {

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

  flltro1() {
    this.profes = [];
    this._adminService.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const docentNew = resultados[key$];
            docentNew.id = key$;
            for (let i = 0; i < docentNew.carreras.length; i++) {
              //console.log(docentNew.carreras.length);
              if (docentNew.carreras[i] == this.horario.carrer) {
                this.profes.push(docentNew);
                console.log(this.profes);
              }
            }
          }
          return this.profes;
        }
      );
  }

  flltroDocent() {
    this.profes = [];
    this._adminService.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const docentNew = resultados[key$];
            docentNew.id = key$;
            for (let i = 0; i < docentNew.materias.length; i++) {
              //console.log(docentNew.carreras.length);
              if (docentNew.materias[i] == this.horario.nombreMat) {
                this.profes.push(docentNew);
                console.log('datos de docente', this.profes);
              }
            }
          }
          return this.profes;
        }
      );
    this.creditosCp();
  }

  creditosCp() {
    for (let i = 0; i < this.materias1.length; i++) {
      for (let j = 0; j < this.materias1[i].carreras.length; j++) {
        if (this.horario.nombreMat == this.materias1[i].nombreMat && (this.materias1[i].carreras[j] != 'ASI' ||
          this.materias1[i].carreras[j] != 'ASA' || this.materias1[i].carreras[j] != 'EM' || this.materias1[i].carreras[j] != 'ET')) {
          this.cdCP = true;
          this.credi = false;
          this.cds = this.materias1[i].cd;
          this.cps = this.materias1[i].cp;
          console.log('cd', this.cds);
          console.log('cp', this.cps);
        }
        if (this.horario.nombreMat == this.materias1[i].nombreMat && (this.materias1[i].carreras[j] == 'ASI' ||
          this.materias1[i].carreras[j] == 'ASA' || this.materias1[i].carreras[j] == 'EM' || this.materias1[i].carreras[j] == 'ET')) {
          this.cdCP = false;
          this.credi = true;
          this.creditosM = this.materias1[i].creditos;
          console.log('creditos', this.creditosM);
        }
      }
    }
  }

  fildocente() {
    this.horarios = [];
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            if (horarioNew.docenteNom == this.horario.docenteNom) {
              this.horarios.push(horarioNew);
            }
          }
          return this.horarios;
        }
      );
  }

  flltroMat() {
    this.materias1 = [];
    this._adminService.consultarMaterias()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const materiaNew = resultados[key$];
            materiaNew.id = key$;
            for (let i = 0; i < materiaNew.carreras.length; i++) {
              if (materiaNew.carreras[i] == this.horario.carrer && materiaNew.semestre == this.horario.semest) {
                this.materias1.push(materiaNew);
                console.log('materias', this.materias1);
              }
            }
          }
          return this.materias1;
        }
      );
  }

  clean() {
    this.horario.dias = [];
    this.horario.nombreMat = '';
    this.profes = [];
    this.horario.docenteNom = '';
    this.horario.nombreAula = [];
    this.horario.horaInicios = [];
    this.horario.horaFins = [];
    this.horario.semest = null;
    this.horario.carrer = '';
    this.horario.paralelo = '';
  }

  ngOnInit() {
  }

  //rstrincciones
  //horas incorrectas

  excess() {
    const ini = (document.getElementById('inicio') as HTMLInputElement).value.replace(':', '0');
    const fin = (document.getElementById('fin') as HTMLInputElement).value.replace(':', '0');

    if (+ini < 7000 || +fin > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      //this.permision = false;
      console.log('horas no labaorables');
    } else {
      //this.permision = true;
    }
  }

  excess1() {
    const ini1 = (document.getElementById('inicio1') as HTMLInputElement).value.replace(':', '0');
    const fin1 = (document.getElementById('fin1') as HTMLInputElement).value.replace(':', '0');

    if (+ini1 < 7000 || +fin1 > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      //this.permision = false;
      console.log('horas no labaorables');
    } else {
      //this.permision = true;
    }
  }

  excess2() {
    const ini2 = (document.getElementById('inicio2') as HTMLInputElement).value.replace(':', '0');
    const fin2 = (document.getElementById('fin2') as HTMLInputElement).value.replace(':', '0');

    if (+ini2 < 7000 || +fin2 > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      //this.permision = false;
      console.log('horas no labaorables');
    } else {
      //this.permision = true;
    }
  }


  excess3() {
    const ini3 = (document.getElementById('inicio3') as HTMLInputElement).value.replace(':', '0');
    const fin3 = (document.getElementById('fin3') as HTMLInputElement).value.replace(':', '0');
    if (+ini3 < 7000 || +fin3 > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      //this.permision = false;
      console.log('horas no labaorables');
    } else {
      //this.permision = true;
    }
  }

  excess4() {
    const ini4 = (document.getElementById('inicio4') as HTMLInputElement).value.replace(':', '0');
    const fin4 = (document.getElementById('fin4') as HTMLInputElement).value.replace(':', '0');

    if (+ini4 < 7000 || +fin4 > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      //this.permision = false;
      console.log('horas no labaorables');
    } else {
      //this.permision = true;
    }
  }

  excess5() {
    const ini5 = (document.getElementById('inicio5') as HTMLInputElement).value.replace(':', '0');
    const fin5 = (document.getElementById('fin5') as HTMLInputElement).value.replace(':', '0');

    if (+ini5 < 7000 || +fin5 > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      //this.permision = false;
      console.log('horas no labaorables');
    } else {
      //this.permision = true;
    }
  }

  //control de campos


  permission() {
    if (this.horario.carrer == '' || this.horario.dias.length == 0 || this.horario.nombreMat == '' ||
      this.horario.docenteNom == '' || this.horario.nombreAula == [] || this.horario.horaInicios.length == 0 ||
      this.horario.horaFins.length == 0 || this.horario.semest == null || this.horario.paralelo == '' ||
      this.horario.paralelo == '' || (this.cod === true && this.cod1 === true &&
        this.cod2 === true && this.cod3 === true && this.cod4 === true && this.cod5 === true)) {
      console.log('campos vacios');
      return false;
    } else {
      console.log('campos llenos');
      //this.access = false;
      return true;
    }
  }

  //1. Hora finalizada menor a la hora de inicio y
  // segunda horario empezar desde la hora finalizada de la anterior

  hora2() {
    //let text= (<HTMLInputElement> document.getElementById("inicio")).value.replace(':','0');
    const ini = (document.getElementById('inicio') as HTMLInputElement).value.replace(':', '0');
    const fin = (document.getElementById('fin') as HTMLInputElement).value.replace(':', '0');
    const ini1 = (document.getElementById('inicio1') as HTMLInputElement).value.replace(':', '0');
    const fin1 = (document.getElementById('fin1') as HTMLInputElement).value.replace(':', '0');
    const ini2 = (document.getElementById('inicio2') as HTMLInputElement).value.replace(':', '0');
    const fin2 = (document.getElementById('fin2') as HTMLInputElement).value.replace(':', '0');
    const ini3 = (document.getElementById('inicio3') as HTMLInputElement).value.replace(':', '0');
    const fin3 = (document.getElementById('fin3') as HTMLInputElement).value.replace(':', '0');
    const ini4 = (document.getElementById('inicio4') as HTMLInputElement).value.replace(':', '0');
    const fin4 = (document.getElementById('fin4') as HTMLInputElement).value.replace(':', '0');
    const ini5 = (document.getElementById('inicio5') as HTMLInputElement).value.replace(':', '0');
    const fin5 = (document.getElementById('fin5') as HTMLInputElement).value.replace(':', '0');

    if (Date.parse(ini) >= Date.parse(fin) || Date.parse(ini1) >= Date.parse(fin1) ||
      Date.parse(ini2) >= Date.parse(fin2) || Date.parse(ini3) >= Date.parse(fin3) ||
      Date.parse(ini4) >= Date.parse(fin4) || Date.parse(ini5) >= Date.parse(fin5)) {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Hora final es inferior a hora de inicio'});
      //this.access = true;

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
      total = (+total1 + +total2 + +total3 + +total4 + +total5 + +total6).toString().split('')[0];
      console.log('total: ', total);
      for (let i = 0; i < this.materias1.length; i++) {
        if (this.materias1[i].nombreMat == this.horario.nombreMat) {
          if (+total == this.materias1[i].creditos || +total == this.materias1[i].totalHoras) {
            this.msgs.push({
              severity: 'success', summary: 'Correcto',
              detail: 'Rango de horas coinciden con el número de créditos o con cp y cd'
            });
            this.correct = false;
          } else {
            this.msgs = [];
            this.msgs.push({
              severity: 'error', summary: 'Error',
              detail: 'Rango de horas no coinciden con el número de créditos o número de horas'
            });
            this.correct = true;
          }

        }
      }

    }
  }

  cruze() {
    if (this.horarios.length != 0) {
      for (let i = 0; i < this.horarios.length; i++) {
        console.log('total lon', this.horarios.length);
        if (this.horarios[i].nombreAula == this.horario.nombreAula) {
          console.log('aula ocupada');
          for (let j = 0; j < this.horarios[i].dias.length; j++) {
            if (this.horarios[i].dias[j] == this.horario.dias[0]) {
              console.log('dia ocupada');
              for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
                if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[0] ||
                  this.horario.horaInicios[0] < this.horarios[i].horaFins[k]) {
                  console.log('hora inicial ocupada');
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error',
                    detail: 'Ya existe un horario con esta información, favor de cambiar'
                  });
                  for (let l = 0; l < this.horarios.length; l++) {
                    if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                      console.log('docente ocupado');
                    }
                  }
                }
              }
            }
          }
        }
        for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
          if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[0] ||
            this.horario.horaInicios[0] < this.horarios[i].horaFins[k]) {
            console.log('hora inicial ocupada');
            for (let l = 0; l < this.horarios.length; l++) {
              if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                console.log('docente ocupado');
                this.msgs = [];
                this.msgs.push({
                  severity: 'error', summary: 'Error',
                  detail: 'El docente no puede estar en dos lugares a la vez'
                });
                this.permision = false;
              } else {
                this.permision = true;
              }
            }
          } else {
            this.permision = true;
          }
        }
      }
    } else {
      this.permision = true;
    }
  }

  cruze1() {
    if (this.horarios.length != 0) {
      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].nombreAula == this.horario.nombreAula) {
          console.log('aula ocupada');
          for (let j = 0; j < this.horarios[i].dias.length; j++) {
            if (this.horarios[i].dias[j] == this.horario.dias[1]) {
              console.log('dia ocupada');
              for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
                if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[1] ||
                  this.horario.horaInicios[1] < this.horarios[i].horaFins[k]) {
                  console.log('hora inicial ocupada');
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error',
                    detail: 'Ya existe un horario con esta información, favor de cambiar'
                  });
                  for (let l = 0; l < this.horarios.length; l++) {
                    if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                      console.log('docente ocupado');
                    }
                  }
                }
              }
            }
          }
        }
        for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
          if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[1] ||
            this.horario.horaInicios[1] < this.horarios[i].horaFins[k]) {
            console.log('hora inicial ocupada');
            for (let l = 0; l < this.horarios.length; l++) {
              if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                console.log('docente ocupado');
                this.msgs = [];
                this.msgs.push({
                  severity: 'error', summary: 'Error',
                  detail: 'El docente no puede estar en dos lugares a la vez'
                });
                this.permision = false;
              } else {
                this.permision = true;
              }
            }
          } else {
            this.permision = true;
          }
        }
      }
    } else {
      this.permision = true;
    }
  }

  cruze2() {
    if (this.horarios.length != 0) {
      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].nombreAula == this.horario.nombreAula) {
          console.log('aula ocupada');
          for (let j = 0; j < this.horarios[i].dias.length; j++) {
            if (this.horarios[i].dias[j] == this.horario.dias[2]) {
              console.log('dia ocupada');
              for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
                if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[2] ||
                  this.horario.horaInicios[2] < this.horarios[i].horaFins[k]) {
                  console.log('hora inicial ocupada');
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error',
                    detail: 'Ya existe un horario con esta información, favor de cambiar'
                  });
                  for (let l = 0; l < this.horarios.length; l++) {
                    if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                      console.log('docente ocupado');
                    }
                  }
                }
              }
            }
          }
        }
        for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
          if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[2] ||
            this.horario.horaInicios[2] < this.horarios[i].horaFins[k]) {
            console.log('hora inicial ocupada');
            for (let l = 0; l < this.horarios.length; l++) {
              if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                console.log('docente ocupado');
                this.msgs = [];
                this.msgs.push({
                  severity: 'error', summary: 'Error',
                  detail: 'El docente no puede estar en dos lugares a la vez'
                });
                this.permision = false;
              } else {
                this.permision = true;
              }
            }
          } else {
            this.permision = true;
          }
        }
      }
    } else {
      this.permision = true;
    }
  }

  cruze3() {
    if (this.horarios.length != 0) {
      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].nombreAula == this.horario.nombreAula) {
          console.log('aula ocupada');
          for (let j = 0; j < this.horarios[i].dias.length; j++) {
            if (this.horarios[i].dias[j] == this.horario.dias[3]) {
              console.log('dia ocupada');
              for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
                if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[3] ||
                  this.horario.horaInicios[3] < this.horarios[i].horaFins[k]) {
                  console.log('hora inicial ocupada');
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error',
                    detail: 'Ya existe un horario con esta información, favor de cambiar'
                  });
                  for (let l = 0; l < this.horarios.length; l++) {
                    if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                      console.log('docente ocupado');
                    }
                  }
                }
              }
            }
          }
        }
        for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
          if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[3] ||
            this.horario.horaInicios[3] < this.horarios[i].horaFins[k]) {
            console.log('hora inicial ocupada');
            for (let l = 0; l < this.horarios.length; l++) {
              if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                console.log('docente ocupado');
                this.msgs = [];
                this.msgs.push({
                  severity: 'error', summary: 'Error',
                  detail: 'El docente no puede estar en dos lugares a la vez'
                });
                this.permision = false;
              } else {
                this.permision = true;
              }
            }
          } else {
            this.permision = true;
          }
        }
      }
    } else {
      this.permision = true;
    }
  }

  cruze4() {
    if (this.horarios.length != 0) {
      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].nombreAula == this.horario.nombreAula) {
          console.log('aula ocupada');
          for (let j = 0; j < this.horarios[i].dias.length; j++) {
            if (this.horarios[i].dias[j] == this.horario.dias[4]) {
              console.log('dia ocupada');
              for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
                if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[4] ||
                  this.horario.horaInicios[4] < this.horarios[i].horaFins[k]) {
                  console.log('hora inicial ocupada');
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error',
                    detail: 'Ya existe un horario con esta información, favor de cambiar'
                  });
                  for (let l = 0; l < this.horarios.length; l++) {
                    if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                      console.log('docente ocupado');
                    }
                  }
                }
              }
            }
          }
        }
        for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
          if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[4] ||
            this.horario.horaInicios[4] < this.horarios[i].horaFins[k]) {
            console.log('hora inicial ocupada');
            for (let l = 0; l < this.horarios.length; l++) {
              if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                console.log('docente ocupado');
                this.msgs = [];
                this.msgs.push({
                  severity: 'error', summary: 'Error',
                  detail: 'El docente no puede estar en dos lugares a la vez'
                });
                this.permision = false;
              } else {
                this.permision = true;
              }
            }
          } else {
            this.permision = true;
          }
        }
      }
    } else {
      this.permision = true;
    }
  }

  cruze5() {
    if (this.horarios.length != 0) {
      for (let i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i].nombreAula == this.horario.nombreAula) {
          console.log('aula ocupada');
          for (let j = 0; j < this.horarios[i].dias.length; j++) {
            if (this.horarios[i].dias[j] == this.horario.dias[5]) {
              console.log('dia ocupada');
              for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
                if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[5] ||
                  this.horario.horaInicios[5] < this.horarios[i].horaFins[k]) {
                  console.log('hora inicial ocupada');
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error',
                    detail: 'Ya existe un horario con esta información, favor de cambiar'
                  });
                  for (let l = 0; l < this.horarios.length; l++) {
                    if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                      console.log('docente ocupado');
                    }
                  }
                }
              }
            }
          }
        }
        for (let k = 0; k < this.horarios[i].horaInicios.length; k++) {
          if (this.horarios[i].horaInicios[k] == this.horario.horaInicios[5] ||
            this.horario.horaInicios[5] < this.horarios[i].horaFins[k]) {
            console.log('hora inicial ocupada');
            for (let l = 0; l < this.horarios.length; l++) {
              if (this.horarios[l].docenteNom == this.horario.docenteNom) {
                console.log('docente ocupado');
                this.msgs = [];
                this.msgs.push({
                  severity: 'error', summary: 'Error',
                  detail: 'El docente no puede estar en dos lugares a la vez'
                });
                this.permision = false;
              } else {
                this.permision = true;
              }
            }
          } else {
            this.permision = true;
          }
        }
      }
    } else {
      this.permision = true;
    }
  }


  guardar() {

    if (this.permission() == true) {
      if (this.id == 'nuevo') {
        this._adminService.nuevoHorario(this.horario)
          .subscribe(
            resultado => {
              console.log(resultado.name);
              this._router.navigate(['/horarioadmin', resultado.name]);
              this.msgs = [];
              this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Horario guardado con exito'});
            }
          );
      } else {
        this._adminService.editarHorario(this.horario, this.id)
          .subscribe(
            resultado => {
              this._router.navigate(['/admin']);
              this.msgs = [];
              this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Horario editado con exito'});
            }
          );
      }
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Campos vacios, por favor llenar todos los campos para continuar'});

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
        console.log('hola');
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
        console.log('hola');
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
        console.log('hola');
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
        console.log('hola');
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
        console.log('hola');
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
        console.log('hola');
    }
  }

  /**/
}
