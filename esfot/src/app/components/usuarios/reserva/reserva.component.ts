import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/api';
import {Horarios} from '../../../interfaces/horarios.interface';
import {Aulas} from '../../../interfaces/aulas.interface';
import {Reservas} from '../../../interfaces/reservas.interface';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Materias} from '../../../interfaces/materias.interface';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  msgs: Message[] = [];
  horarios: Horarios[] = [];
  aulas: Aulas[] = [];
  materias: Materias[] = [];
  reservas: Reservas[] = [];
  id: string;
  reserva: Reservas = {
    nombreDocent: '',
    nombreMat: '',
    aula: '',
    dia: '',
    fecha: '',
    horaFin: '',
    horaInicio: '',
  }


  date2: Date;
  es: any;
  constructor(private _adminServices: AdminService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._adminServices.getReserva(this.id)
              .subscribe(
                resultado => {
                  this.reserva = resultado;
                }
              );
          }
        }
      );

    this._adminServices.consultarHorarios()
      .subscribe(
        res => {
          for (const key$ in res) {
            const horarioNew = res[key$];
            horarioNew.id = key$;
            this.horarios.push(horarioNew);
          }
          return this.horarios;
        }
      );

    this._adminServices.consultarReserva()
      .subscribe(
        res => {
          for (const key$ in res) {
            const reservaNew = res[key$];
            reservaNew.id = key$;
            this.reservas.push(reservaNew);
          }
          return this.reservas;
        }
      );

    this._adminServices.consultarMaterias()
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

    this._adminServices.consultarAulas()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const aulaNew = resultados[key$];
            aulaNew.id = key$;
            this.aulas.push(aulaNew);
          }
          return this.aulas;
        }
      );
  }

  clean() {
    this.reserva.nombreMat = '';
    this.reserva.dia = '';
    this.reserva.fecha = '';
    this.reserva.horaInicio = '';
    this.reserva.horaFin = '';
    this.reserva.aula = '';
  }

  guardarRe() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevaReserva(this.reserva)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/reserva', resultado.name]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Reserva guardada con exito'});
          }
        );
    } else {
      this._adminServices.editaraReserva(this.reserva, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Reserva editada con exito'});
          }
        );
    }
  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo", "lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom", 'lun',"mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","M","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'DD/MM/yy'
    };
  }

  hor() {
    let fin = (document.getElementById("fin")as HTMLInputElement).value.replace(':','0')
    let ini = (document.getElementById("inicio") as HTMLInputElement).value.replace(':','0');

    if (Date.parse(ini) >= Date.parse(fin)) {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Hora final es inferior a hora de inicio'});
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Hora correcta'});
    }

    let total;
    total = (+fin - +ini).toString().split("")[0];
    console.log('total', total);
    for (let i = 0; i < this.materias.length; i++) {
      if (this.materias[i].nombreMat == this.reserva.nombreMat) {
        if ( +total == this.materias[i].creditos || +total == this.materias[i].totalHoras) {
          this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Rango de horas correctas'});
        } else {
          this.msgs = [];
          this.msgs.push({severity: 'error', summary: 'Error',
            detail: 'El rango de horas no coinciden con el número de creditos u horas de la materia'});
        }

      }
    }
  }

  val(event) {
    let da = event.toString().split(" ");
    //console.log('2', da[0]);
    switch (da[0]) {
      case "Mon" :
        this.reserva.dia  = "Lunes";
        break;

      case "Tue" :
        this.reserva.dia = "Martes";
        break;

      case "Wed" :
        this.reserva.dia = "Miercoles";
        break;

      case "Thu" :
        this.reserva.dia  = "Jueves";
        break;

      case "Fri" :
        this.reserva.dia  = "Viernes";
        break;

      case "Sat" :
        this.reserva.dia  = "Sabado";
        break;
    }

    //console.log('3', this.reserva.dia );
  }

  val1(event) {
    let da = event.toString().split(" ");
    switch (da[1]) {
      case "Jan" :
        this.reserva.fecha  = "Enero " + da[2] + " " + da[3];
        break;

      case "Feb" :
        this.reserva.fecha = "Febrero " + da[2] + " " + da[3];
        break;

      case "Mar" :
        this.reserva.fecha = "Marzo " + da[2] + " " + da[3];
        break;

      case "Apr" :
        this.reserva.fecha  = "Abril " + da[2] + " " + da[3];
        break;

      case "May" :
        this.reserva.fecha  = "Mayo " + da[2] + " " + da[3];
        break;

      case "Jun" :
        this.reserva.fecha  = "Junio " + da[2] + " " + da[3];
        break;

      case "Jul" :
        this.reserva.dia  = "Julio " + da[2] + " " + da[3];
        break;

      case "Aug" :
        this.reserva.fecha  = "Agosto " + da[2] + " " + da[3];
        break;

      case "Sep" :
        this.reserva.fecha  = "Septiembre " + da[2] + " " + da[3];
        break;

      case "Oct" :
        this.reserva.fecha  = "Octubre " + da[2] + " " + da[3];
        break;

      case "Nov" :
        this.reserva.fecha  = "Noviembre " + da[2] + " " + da[3];
        break;

      case "Dec" :
        this.reserva.fecha  = "Diciembre " + da[2] + " " + da[3];
        break;
    }
    console.log('mes', this.reserva.fecha);
  }

  cruz() {
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].nombreAula == this.reserva.aula) {
        console.log('aula igual');
        for (let j = 0; j < 7; j++) {
          if (this.horarios[i].dias[j] == this.reserva.dia) {
            console.log('dia igual');
            for (let k = 0; k < 7; k++) {
              if (this.horarios[i].horaInicios[k] == this.reserva.horaInicio || this.reserva.horaInicio < this.horarios[i].horaFins[k]) {
                console.log('hora incorrect');
                this.msgs = [];
                this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
              }
            }
          }
        }
      }
    }
  }

  reserv() {
    for (let i = 0; i < this.reservas.length; i++) {
      if (this.reservas[i].aula == this.reserva.aula) {
        console.log('aula igual');
        if (this.reservas[i].dia == this.reserva.dia) {
          console.log('dia igual');
          if (this.reservas[i].horaInicio == this.reserva.horaInicio || this.reserva.horaInicio < this.reservas[i].horaFin) {
            console.log('hora incorrect');
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Ocupado'});
          }
        }
      }
    }
  }
}

