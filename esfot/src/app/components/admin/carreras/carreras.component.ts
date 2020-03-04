import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Carreras} from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras: Carreras[] = [];
  cols: any[];
  selectedCarr: Carreras;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;

  public openPdf() {
    console.log('opening pdf in new tab!');
    this.externalPdfViewer.pdfSrc = './../../../assets/Manual de Usuario.pdf';
    this.externalPdfViewer.refresh();
  }

  constructor(private _adminService: AdminService) {
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

  ngOnInit() {
    this.cols = [
      {field: 'nombreCarr', header: 'Nombre de la carrera'},
      {field: 'siglas', header: 'Nomenclatura'},

    ];
  }

  eliminar(id: string) {
    const index = this.carreras.indexOf(this.selectedCarr);
    console.log('index', index);
    console.log('id', id);
    this._adminService.eliminarCarrera(id)
      .subscribe(
        resultados => {
          console.log('datos', id, index);
          this.carreras.splice(index, 1);
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
