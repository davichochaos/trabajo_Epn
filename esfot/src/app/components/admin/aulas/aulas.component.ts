import {Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Aulas } from '../../../interfaces/aulas.interface';
import {MessageService} from 'primeng/api';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {
  aulas: Aulas[] = [];
  cols: any[];
  selectedAulas: Aulas;
  index: any;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }
  constructor(private _adminService: AdminService, private messageService: MessageService) {
    this._adminService.consultarAulas()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.aulas.push(usuarioNew);
          }
          return this.aulas;
        }
      );
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'a', sticky: true, severity: 'warn', summary: 'Esta seguro ?',
      detail: 'Confirme para proceder con la eliminación de toda s las aulas'});
  }

  onConfirm() {
    this.messageService.clear('a');
    this.elminiarTodo();
  }

  traerIndex(aula: Aulas) {
    this.selectedAulas = aula;
    console.log(this.selectedAulas);
    this.index = this.aulas.indexOf(this.selectedAulas);
    console.log('p', this.index);
  }

  onReject() {
    this.messageService.clear('a');
  }
  ngOnInit() {
    this.cols = [
      { field: 'nombreAula', header: 'Aula o Laboratorio' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'cupo', header: 'Cupo' },

    ];
  }

  eliminar(id: string) {
    this._adminService.eliminarAula(id)
      .subscribe(
        resultados => {
          this.aulas = this.aulas.filter((val, i) => i != this.index);
          //this.aulas.splice(index, 1);
        }
      );
  }

  elminiarTodo() {
    console.log('todo');
    this._adminService.eliminarAulas()
      .subscribe(
        resultados => {
          delete this.aulas;
        }
      );
  }
}
