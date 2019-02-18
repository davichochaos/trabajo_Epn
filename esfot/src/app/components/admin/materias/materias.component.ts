import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Materias} from '../../../interfaces/materias.interface';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias: Materias[] = [];

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
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion: number) {
    this._adminService.eliminarMateria(id)
      .subscribe(
        resultados => {
          this.materias.splice(posicion, 1);
        }
      );
  }

}
