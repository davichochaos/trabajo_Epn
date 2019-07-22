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
  datos:boolean;
  datos1: boolean;


  constructor(private _adminService: AdminService) {
    let usuarioGuar;
    usuarioGuar =  localStorage.getItem('Docent');
    usuarioGuar = JSON.parse(usuarioGuar);
    this._adminService.consultarReserva()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const reservaNew = resultados[key$];
            reservaNew.id = key$;
            if (reservaNew.nombreDocent === usuarioGuar.nombreDocent)  {
              this.reservas.push(reservaNew);
              this.datos1 = true;
            } else {
              this.datos = true;
            }
          }
          return this.reservas;
        }
      );
  }

  ngOnInit() {
  }
}
