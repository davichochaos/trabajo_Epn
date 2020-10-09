import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Carreras} from '../../../interfaces/carreras.interface';
import {MessageService} from 'primeng/api';
import {Aulas} from '../../../interfaces/aulas.interface';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras: Carreras[] = [];
  cols: any[];
  selectedCarr: Carreras;
  index: any;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;

  public openPdf() {
    console.log('opening pdf in new tab!');
    this.externalPdfViewer.pdfSrc = './../../../assets/Manual de Usuario.pdf';
    this.externalPdfViewer.refresh();
  }

  constructor(private _adminService: AdminService, private messageService: MessageService) {
    this._adminService.consultarCarreras()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.carreras.push(usuarioNew);
          }
          return this.carreras;
        }
      );
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Esta seguro ?',
      detail: 'Confirme para proceder con la eliminación de todas las carreras'});
  }

  onConfirm() {
    this.messageService.clear('c');
    this.elminiarTodo();
  }

  onReject() {
    this.messageService.clear('c');
  }

  ngOnInit() {
    this.cols = [
      {field: 'nombreCarr', header: 'Nombre de la carrera'},
      {field: 'siglas', header: 'Nomenclatura'},

    ];
  }

  traerIndex(carrera: Carreras) {
    this.selectedCarr = carrera;
    console.log(this.selectedCarr);
    this.index = this.carreras.indexOf(this.selectedCarr);
    console.log('p', this.index);
  }

  eliminar(id: string) {
    console.log('id', id);
    this._adminService.eliminarCarrera(id)
      .subscribe(
        resultados => {
          this.carreras = this.carreras.filter((val, i) => i != this.index);
          //this.carreras.splice(index, 1);
        }
      );
  }

  elminiarTodo() {
    console.log('todo');
    this._adminService.eliminarCarreras()
      .subscribe(
        resultados => {
          delete this.carreras;
        }
      );
  }

}
