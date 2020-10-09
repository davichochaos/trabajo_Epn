import {Component, OnInit, ViewChild} from '@angular/core';
import {Reservas} from '../../../interfaces/reservas.interface';
import {AdminService} from '../../../services/admin.service';
import {MessageService} from 'primeng/api';
import {Aulas} from '../../../interfaces/aulas.interface';

@Component({
  selector: 'app-reservas-ad',
  templateUrl: './reservas-ad.component.html',
  styleUrls: ['./reservas-ad.component.css']
})
export class ReservasAdComponent implements OnInit {

  reservas: Reservas[] = [];
  cols: any[];
  selectedRese: Reservas;
  index: any;
  dat: boolean;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }

  constructor(private _adminService: AdminService, private messageService: MessageService) {
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
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'r', sticky: true, severity: 'warn', summary: 'Esta seguro ?',
      detail: 'Confirme para proceder con la eliminación de todas las reservas'});
  }

  onConfirm() {
    this.messageService.clear('r');
    this.elminiarTodo();
  }

  traerIndex(reserva: Reservas) {
    this.selectedRese = reserva;
    console.log(this.selectedRese);
    this.index = this.reservas.indexOf(this.selectedRese);
    console.log('p', this.index);
  }

  onReject() {
    this.messageService.clear('r');
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
    this._adminService.eliminarReserva(id)
      .subscribe(
        resultados => {
          this.reservas = this.reservas.filter((val, i) => i != this.index);
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
