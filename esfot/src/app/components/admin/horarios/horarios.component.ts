import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Horarios} from '../../../interfaces/horarios.interface';
import {AdminService} from '../../../services/admin.service';
import {Docentes} from '../../../interfaces/docentes.interface';
import {Aulas} from '../../../interfaces/aulas.interface';

import * as XLSX from 'xlsx';
import {Carreras} from '../../../interfaces/carreras.interface';


@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  checked: boolean = false;
  val2: string = 'Option 1';
  horarios: Horarios[] = [];
  docentes: Docentes[] = [];
  aulas: Aulas [] = [];
  carreras: Carreras [] = [];
  docentName: any;
  nivel: any;
  labo: any;
  carre: any;

  @ViewChild('table') table: ElementRef;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }

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

    this._adminService.consultarCarreras()
      .subscribe(
        result => {
          for (const keys$ in result) {
            const carreraNew =  result[keys$];
            carreraNew.id = keys$;
            this.carreras.push(carreraNew);
          }
          return this.carreras;
        }
      );
  }

  ngOnInit() {
  }

  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    for (let i = 0; i <= this.horarios.length; i++) {
      const range = {s: {c: 0, r: 0}, e: {c: 9, r: i}};
      ws['!ref'] = XLSX.utils.encode_range(range);
    }
    //const range = {s: {c: 0, r: 0}, e: {c: 9, r: 4}};
    //ws['!ref'] = XLSX.utils.encode_range(range);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Esfot');

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

  elminiarTodo() {
    console.log('todo');
    this._adminService.eliminarHorarios()
      .subscribe(
        resultados => {
          delete this.horarios;
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
              if (horarioNew.carrer == this.carre && horarioNew.semest == this.nivel) {
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
