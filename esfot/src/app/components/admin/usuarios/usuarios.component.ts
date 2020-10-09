import {Component, OnInit, ViewChild} from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Docentes } from '../../../interfaces/docentes.interface';
import { Carreras } from '../../../interfaces/carreras.interface';
import {MessageService} from 'primeng/api';
import {Aulas} from '../../../interfaces/aulas.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Docentes[] = [];
  cols: any[];
  selectedUsu: Docentes;
  index: any;

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }

  constructor(private _usuarioService: AdminService, private messageService: MessageService) {
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
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity: 'warn', summary: 'Esta seguro ?',
      detail: 'Confirme para proceder con la eliminación de todos los usuarios'});
  }

  onConfirm() {
    this.messageService.clear('c');
    this.elminiarTodo();
  }

  traerIndex(usu: Docentes) {
    this.selectedUsu = usu;
    console.log(this.selectedUsu);
    this.index = this.usuarios.indexOf(this.selectedUsu);
    console.log('p', this.index);
  }

  onReject() {
    this.messageService.clear('c');
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
    this._usuarioService.eliminarUsuario(id)
      .subscribe(
        resultados => {
          //this.usuarios.splice(index, 1);
          this.usuarios = this.usuarios.filter((val, i) => i != this.index);

        }
      );
  }

  elminiarTodo() {
    console.log('todo');
    this._usuarioService.eliminarUsuarios()
      .subscribe(
        resultados => {
          delete this.usuarios;
        }
      );
  }

}
