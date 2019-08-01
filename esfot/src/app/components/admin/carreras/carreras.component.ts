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
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/sample.pdf";
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
  }

  eliminar(id: string, posicion: number) {
    this._adminService.eliminarCarrera(id)
      .subscribe(
        resultados => {
          this.carreras.splice(posicion, 1);
        }
      );
  }

}
