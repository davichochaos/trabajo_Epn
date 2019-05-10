import { Component, OnInit } from '@angular/core';
import {Docentes} from '../../../interfaces/docentes.interface';
import {SuperService} from '../../../services/super.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  usuarios: Docentes[] = [];

  constructor(private _datosService: SuperService) {
    this._datosService.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.usuarios.push(usuarioNew);
          }
          return this.usuarios;
        }
      );
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion: number) {
    this._datosService.eliminarUsuario(id)
      .subscribe(
        resultados => {
          this.usuarios.splice(posicion, 1);
        }
      );
  }

}
