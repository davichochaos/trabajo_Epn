import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Horarios} from '../../../interfaces/horarios.interface';
import {AdminService} from '../../../services/admin.service';
import {Docentes} from '../../../interfaces/docentes.interface';
import {Aulas} from '../../../interfaces/aulas.interface';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  @ViewChild('table') table: ElementRef;

  val2: string = 'Option 1';
  horarios: Horarios[] = [];
  docentes: Docentes[] = [];
  aulas: Aulas [] = [];
  docentName: any;
  nivel: any;
  labo: any;

  constructor(private _adminService: AdminService) {
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            this.horarios.push(horarioNew);
          }
          return this.horarios;
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

    this._adminService.consultarAulas()
      .subscribe(
        result => {
          for (const keys$ in result) {
            const aulaNew = result[keys$];
            aulaNew.id = keys$;
            this.aulas.push(aulaNew);
          }
          return this.aulas;
        }
      );
  }

  ngOnInit() {
  }

  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ReporteHorario.xlsx');

  }

  eliminar(id: string, posicion: number) {
    this._adminService.eliminarHorario(id)
      .subscribe(
        resultados => {
          this.horarios.splice(posicion, 1);
        }
      );
  }

  filhorario() {
    this.horarios = [];
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
              if (/*horarioNew.docenteNom == this.docentName &&*/ horarioNew.semest == this.nivel) {
                this.horarios.push(horarioNew);
              }
          }
          return this.horarios;
        }
      );
  }

  fildocente() {
    this.horarios = [];
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            if (horarioNew.docenteNom == this.docentName) {
              this.horarios.push(horarioNew);
            }
          }
          return this.horarios;
        }
      );
  }

  filaula() {
    this.horarios = [];
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            if (horarioNew.nombreAula == this.labo) {
              this.horarios.push(horarioNew);
            }
          }
          return this.horarios;
        }
      );
  }

  todos() {
    this.horarios = [];
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            this.horarios.push(horarioNew);
          }
          return this.horarios;
        }
      );
  }
}
