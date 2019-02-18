import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Aulas } from '../../../interfaces/aulas.interface';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {

  aulas: Aulas[] = [];
  constructor(private _adminService: AdminService) {
    this._adminService.consultarAulas()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.aulas.push(usuarioNew);
          }
          return this.aulas;
        }
      );
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion: number) {
    this._adminService.eliminarAula(id)
      .subscribe(
        resultados => {
          this.aulas.splice(posicion, 1);
        }
      );
  }
}
