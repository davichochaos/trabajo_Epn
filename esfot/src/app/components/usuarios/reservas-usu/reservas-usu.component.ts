import { Component, OnInit } from '@angular/core';
import {Reservas} from '../../../interfaces/reservas.interface';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-reservas-usu',
  templateUrl: './reservas-usu.component.html',
  styleUrls: ['./reservas-usu.component.css']
})
export class ReservasUsuComponent implements OnInit {

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
}
