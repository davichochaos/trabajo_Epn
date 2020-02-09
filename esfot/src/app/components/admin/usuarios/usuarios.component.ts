import {Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Docentes } from '../../../interfaces/docentes.interface';
import { Carreras } from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Docentes[] = [];
  cols: any[];
  selectedUsu: Docentes;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }

  constructor(private _usuarioService: AdminService) {
    this._usuarioService.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            if (usuarioNew.cargo !== 'SuperAdmin') {
              if (usuarioNew.cargo !== 'Administrador') {
                this.usuarios.push(usuarioNew);
              }

            }
          }
          return this.usuarios;
        }
      );
  }

  ngOnInit() {
    this.cols = [
      { field: 'apellidoDocent', subfield: 'nombreDocent' , header: 'Docentes' },
      { field: 'cargo', header: 'Cargo' },
      { field: 'carreras', header: 'Carreras' },
      { field: 'materias', header: 'Materias' },

    ];
  }

  eliminar(id: string) {
    const index = this.usuarios.indexOf(this.selectedUsu);
    console.log('index', index);
    console.log('id', id);
    this._usuarioService.eliminarUsuario(id)
      .subscribe(
        resultados => {
          this.usuarios.splice(index, 1);
        }
      );
  }

}
