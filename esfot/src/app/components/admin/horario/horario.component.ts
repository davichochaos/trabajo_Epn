import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import { Aulas } from '../../../interfaces/aulas.interface';
import {AdminService} from '../../../services/admin.service';
import {Horarios} from '../../../interfaces/horarios.interface'
import {Materias} from '../../../interfaces/materias.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Docentes} from '../../../interfaces/docentes.interface';
import {tokenReference} from '@angular/compiler';

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
  horario: Horarios = {
    dia: null,
    dia1: null,
    dia2: null,
    dia3: null,
    dia4: null,
    dia5: null,
    nombreMat: '',
    docenteNom: '',
    nombreAula: '',
    horaInicio: null,
    horaFin: null,
    horaInicio1: null,
    horaFin1: null,
    horaInicio2: null,
    horaFin2: null,
    horaInicio3: null,
    horaFin3: null,
    horaInicio4: null,
    horaFin4: null,
    horaInicio5: null,
    horaFin5: null,
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

    if (Date.parse(horaDesde) > Date.parse(horaHasta) || Date.parse(horaDesde1) > Date.parse(horaHasta1) ||
        Date.parse(horaDesde2) > Date.parse(horaHasta2) || Date.parse(horaDesde3) > Date.parse(horaHasta3) ||
        Date.parse(horaDesde4) > Date.parse(horaHasta4) || Date.parse(horaDesde5) > Date.parse(horaHasta5)) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Hora final es inferior a hora de inicio'});

    }

    /*if (Date.parse(horaDesde1) != Date.parse(horaHasta) || Date.parse(horaDesde2) != Date.parse(horaHasta1)) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Hora de inicio incorrecta'});
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
        this.horario.dia = 'Lunes';
        this.cod = false;

        break;
      case false:
        this.horario.dia = null;
        this.cod = true;

        break;
      default:
        console.log("hola");
    }
  }

  val1() {
    switch (this.cod1) {
      case true:
        this.horario.dia1 = 'Martes';
        this.cod1 = false;

        break;
      case false:
        this.horario.dia1 = null;
        this.cod1 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val2() {
    switch (this.cod2) {
      case true:
        this.horario.dia2 = 'Miercoles';
        this.cod2 = false;

        break;
      case false:
        this.horario.dia2 = null;
        this.cod2 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val3() {
    switch (this.cod3) {
      case true:
        this.horario.dia3 = 'Jueves';
        this.cod3 = false;

        break;
      case false:
        this.horario.dia3 = null;
        this.cod3 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val4() {
    switch (this.cod4) {
      case true:
        this.horario.dia4 = 'Viernes';
        this.cod4 = false;

        break;
      case false:
        this.horario.dia4 = null;
        this.cod4 = true;

        break;
      default:
        console.log("hola");
    }
  }

  val5() {
    switch (this.cod5) {
      case true:
        this.horario.dia5 = 'Sabado';
        this.cod5 = false;

        break;
      case false:
        this.horario.dia5 = null;
        this.cod5 = true;

        break;
      default:
        console.log("hola");
    }
  }
}
