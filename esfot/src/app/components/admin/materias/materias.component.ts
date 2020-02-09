import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Materias} from '../../../interfaces/materias.interface';
import {Carreras} from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias: Materias[] = [];
  checked: boolean = false;
  cols: any[];

  val: string = 'Option 1';
  carreras: Carreras [] = [];
  selectedMate: Materias;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }

  constructor(private _adminService: AdminService) {
    this._adminService.consultarMaterias()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const materiaNew = resultados[key$];
            materiaNew.id = key$;
            this.materias.push(materiaNew);
          }
          return this.materias;
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
    this.cols = [
      { field: 'nombreMat', header: 'Materia' },
      { field: 'codigo', header: 'Código' },
      { field: 'semestre', header: 'Semestre o Nivel' },
      { field: 'creditos', header: 'Créditos' },
      { field: 'cd', header: 'Componente de Docencia' },
      { field: 'cp', header: 'Componente Práctico' },
      { field: 'carreras', header: 'Carreras' },

    ];
  }

  eliminar(id: string) {
    const index = this.materias.indexOf(this.selectedMate);
    console.log('index', index);
    console.log('id', id);
    this._adminService.eliminarMateria(id)
      .subscribe(
        resultados => {
          this.materias.splice(index, 1);
        }
      );
  }
}
