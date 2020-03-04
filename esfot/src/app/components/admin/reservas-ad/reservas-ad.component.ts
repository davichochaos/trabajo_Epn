import {Component, OnInit, ViewChild} from '@angular/core';
import {Reservas} from '../../../interfaces/reservas.interface';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-reservas-ad',
  templateUrl: './reservas-ad.component.html',
  styleUrls: ['./reservas-ad.component.css']
})
export class ReservasAdComponent implements OnInit {

  reservas: Reservas[] = [];
  cols: any[];
  selectedRese: Reservas;

  dat: boolean;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }

  constructor(private _adminService: AdminService) {
    this._adminService.consultarReserva()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const reservaNew = resultados[key$];
            reservaNew.id = key$;
            this.reservas.push(reservaNew);
          }
          return this.reservas;
        }
      );
  }

  ngOnInit() {
    this.cols = [
      { field: 'nombreDocent', header: 'Docente' },
      { field: 'aula', header: 'Aula' },
      { field: 'nombreMat', header: 'Materia' },
      { field: 'fecha', header: 'Fecha de Reserva' },
      { field: 'horaInicio', header: 'Hora de Inicio' },
      { field: 'horaFin', header: 'Hora de Finalización' },
    ];
  }

  eliminar(id: string) {
    const index = this.reservas.indexOf(this.selectedRese);
    console.log('index', index);
    console.log('id', id);
    this._adminService.eliminarReserva(id)
      .subscribe(
        resultados => {
          this.reservas.splice(index, 1);
        }
      );
  }

  elminiarTodo() {
    console.log('todo');
    this._adminService.eliminarReservas()
      .subscribe(
        resultados => {
          delete this.reservas;
        }
      );
  }
}
