import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Carreras} from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras: Carreras[] = [];

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
