import { Component, OnInit } from '@angular/core';
import {Reservas} from '../../../interfaces/reservas.interface';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-reservas-ad',
  templateUrl: './reservas-ad.component.html',
  styleUrls: ['./reservas-ad.component.css']
})
export class ReservasAdComponent implements OnInit {

  reservas: Reservas[] = [];

  constructor(private _adminService: AdminService) {
    this._adminService.consultarReserva()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const reservaNew = resultados[key$];
            reservaNew.id = key$;
            this.reservas.push(reservaNew);
          }
          return this.reservas;
        }
      );
  }

  ngOnInit() {
  }

  eliminar(id: string, posicion: number) {
    this._adminService.eliminarAula(id)
      .subscribe(
        resultados => {
          this.reservas.splice(posicion, 1);
        }
      );
  }

}