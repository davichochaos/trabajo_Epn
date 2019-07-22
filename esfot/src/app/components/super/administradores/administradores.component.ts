import { Component, OnInit } from '@angular/core';
import {Administrador} from '../../../interfaces/administrador.interface';
import {SuperadService} from '../../../services/superad.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  admins: Administrador[] = [];

  constructor(private _admiService: SuperadService) {
    this._admiService.consultarAdmins()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.admins.push(usuarioNew);
          }
          return this.admins;
        }
      );
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion: number) {
    this._admiService.eliminarAdmin(id)
      .subscribe(
        resultados => {
          this.admins.splice(posicion, 1);
        }
      );
  }

}
