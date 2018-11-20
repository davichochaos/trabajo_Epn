import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import { Aulas } from '../../../interfaces/aulas.interface';
import {AdminService} from '../../../services/admin.service';
import {Horarios} from '../../../interfaces/horarios.interface'
import {Materias} from '../../../interfaces/materias.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {Docentes} from '../../../interfaces/docentes.interface';

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
    dia: '',
    dia1: '',
    dia2: '',
    dia3: '',
    dia4: '',
    dia5: '',
    nombreMat: '',
    docenteNom: '',
    nombreAula: '',
    horaInicio: '',
    horaFin: '',
    horaInicio1: '',
    horaFin1: '',
    horaInicio2: '',
    horaFin2: '',
    horaInicio3: '',
    horaFin3: '',
    horaInicio4: '',
    horaFin4: '',
    horaInicio5: '',
    horaFin5: '',
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

  hora2() {
    //let text= (<HTMLInputElement> document.getElementById("inicio")).value.replace(':','0');
    let horaDesde = (document.getElementById("inicio") as HTMLInputElement).value.replace(':','0');
    let horaHasta = (document.getElementById("fin")as HTMLInputElement).value.replace(':','0');
    let horaDesde1 = (document.getElementById("inicio1") as HTMLInputElement).value.replace(':','0');
    let horaHasta1 = (document.getElementById("fin1")as HTMLInputElement).value.replace(':','0');
    if (Date.parse(horaDesde) > Date.parse(horaHasta) || Date.parse(horaDesde1) > Date.parse(horaHasta1)) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Hora final es inferior a hora de inicio'});

    }

    /*if (Date.parse(horaDesde1) != Date.parse(horaHasta) || Date.parse(horaDesde2) != Date.parse(horaHasta1)) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error', detail:'Hora de inicio incorrecta'});
    }*/
  }

  mat() {
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
}
