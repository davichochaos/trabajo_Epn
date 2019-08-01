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
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/sample.pdf";
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
  }

  eliminar(id: string, posicion: number) {
    this._usuarioService.eliminarUsuario(id)
      .subscribe(
        resultados => {
          this.usuarios.splice(posicion, 1);
        }
      );
  }

}
