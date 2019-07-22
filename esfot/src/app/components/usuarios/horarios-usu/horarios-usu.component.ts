import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Horarios} from '../../../interfaces/horarios.interface';
import * as XLSX from 'xlsx';
import {SuperadService} from '../../../services/superad.service';

@Component({
  selector: 'app-horarios-usu',
  templateUrl: './horarios-usu.component.html',
  styleUrls: ['./horarios-usu.component.css']
})
export class HorariosUsuComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  datos: boolean;
  datos1: boolean;
  horarios: Horarios[] = [];

  constructor(private _adminService: SuperadService) {
    let usuarioGuar;
    usuarioGuar =  localStorage.getItem('Docent');
    usuarioGuar = JSON.parse(usuarioGuar);
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            if (horarioNew.docenteNom === usuarioGuar.nombreDocent) {
              this.datos = true;
              this.horarios.push(horarioNew);
            } else {
              this.datos1 = true;
            }
          }
          return this.horarios;
        }
      );
  }

  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ReporteHorario.xlsx');

  }

  ngOnInit() {
  }

}
