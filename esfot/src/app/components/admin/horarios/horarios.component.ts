import { Component, OnInit } from '@angular/core';
import {Horarios} from '../../../interfaces/horarios.interface';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  horarios: Horarios[] = [];

  constructor(private _adminService: AdminService) {
    this._adminService.consultarHorarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const horarioNew = resultados[key$];
            horarioNew.id = key$;
            this.horarios.push(horarioNew);
          }
          return this.horarios;
        }
      );
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion: number) {
    this._adminService.eliminarHorario(id)
      .subscribe(
        resultados => {
          this.horarios.splice(posicion, 1);
        }
      );
  }

}
