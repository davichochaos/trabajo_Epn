import {Component, OnInit} from '@angular/core';
import {Reservas} from '../../../interfaces/reservas.interface';
import {Horarios} from '../../../interfaces/horarios.interface';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from 'primeng/api';
import {Aulas} from '../../../interfaces/aulas.interface';
import {Materias} from '../../../interfaces/materias.interface';
import {Docentes} from '../../../interfaces/docentes.interface';

@Component({
  selector: 'app-reserva-admin',
  templateUrl: './reserva-admin.component.html',
  styleUrls: ['./reserva-admin.component.css']
})
export class ReservaAdminComponent implements OnInit {

  permision: boolean = false;
  correct: boolean;
  credi: boolean = false;
  cdCP: boolean = false;
  creditosM: any;
  cds: any;
  cps: any;

  msgs: Message[] = [];
  horarios: Horarios[] = [];
  aulas: Aulas[] = [];
  materias: Materias[] = [];
  reservas: Reservas[] = [];
  docentes: Docentes[] = [];
  id: string;
  reserva: Reservas = {
    nombreDocent: '',
    nombreMat: '',
    aula: '',
    dia: '',
    fecha: '',
    horaFin: '',
    horaInicio: '',
  };

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


    this._adminServices.consultarAulas()
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

    this._adminServices.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.docentes.push(usuarioNew);
          }
          return this.docentes;
        }
      );
  }

  mater() {
    this.materias = [];
    this._adminServices.consultarMaterias()
      .subscribe(
        result => {
          for (const key$ in result) {
            const materiaNew = result[key$];
            materiaNew.id = key$;
            for (let i = 0; i < this.docentes.length; i++) {
              if ((this.docentes[i].apellidoDocent + ' ' + this.docentes[i].nombreDocent) == this.reserva.nombreDocent) {
                for (let j = 0; j < this.docentes[i].materias.length; j++) {
                  if (materiaNew.nombreMat == this.docentes[i].materias[j]) {
                    this.materias.push(materiaNew);
                    console.log(this.materias);
                  }
                }
              }
            }
          }
          return this.materias;
        }
      );
  }

  creditosCp() {
    for (let i = 0; i < this.materias.length; i++) {
      for (let j = 0; j < this.materias[i].carreras.length; j++) {
        if (this.reserva.nombreMat == this.materias[i].nombreMat && (this.materias[i].carreras[j] != 'ASI' ||
          this.materias[i].carreras[j] != 'ASA' || this.materias[i].carreras[j] != 'EM' || this.materias[i].carreras[j] != 'ET')) {
          this.cdCP = true;
          this.credi = false;
          this.cds = this.materias[i].cd;
          this.cps = this.materias[i].cp;
          console.log('cd', this.cds);
          console.log('cp', this.cps);
        }
        if (this.reserva.nombreMat == this.materias[i].nombreMat && (this.materias[i].carreras[j] == 'ASI' ||
          this.materias[i].carreras[j] == 'ASA' || this.materias[i].carreras[j] == 'EM' || this.materias[i].carreras[j] == 'ET')) {
          this.cdCP = false;
          this.credi = true;
          this.creditosM = this.materias[i].creditos;
          console.log('creditos', this.creditosM);
        }
      }
    }
  }

  clean() {
    this.reserva.nombreDocent = '';
    this.reserva.nombreMat = '';
    this.reserva.dia = '';
    this.reserva.fecha = '';
    this.reserva.horaInicio = '';
    this.reserva.horaFin = '';
    this.reserva.aula = '';
    this.materias = [];

  }

  excess() {
    let ini = (document.getElementById('inicio') as HTMLInputElement).value.replace(':', '0');
    let fin = (document.getElementById('fin') as HTMLInputElement).value.replace(':', '0');

    if (+ini < 7000 || +fin > 21000) {
      this.msgs = [];
      this.msgs.push({
        severity: 'error', summary: 'Error',
        detail: 'Horas no laborables, por favor escoja horas habiles entre las 07:00 hasta las 21:00'
      });
      console.log('horas no labaorables');
    } else {
    }
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
            this._router.navigate(['/admin']);
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Reserva editada con exito'});
          }
        );
    }
  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'DD/MM/yy'
    };
  }

  hor() {
    let fin = (document.getElementById('fin') as HTMLInputElement).value.replace(':', '0');
    let ini = (document.getElementById('inicio') as HTMLInputElement).value.replace(':', '0');

    if (Date.parse(ini) >= Date.parse(fin)) {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Hora final es inferior a hora de inicio'});
    } else {
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Hora correcta'});
    }

    let total;
    total = (+fin - +ini).toString().split('')[0];
    console.log('total', total);
    for (let i = 0; i < this.materias.length; i++) {
      if (this.materias[i].nombreMat == this.reserva.nombreMat) {
        if (+total == this.materias[i].creditos || +total == this.materias[i].totalHoras) {
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Rango de horas correctas'});
          //this.correct = true;
          this.permision = true;
        } else {
          this.permision = false;

          this.msgs = [];
          this.msgs.push({
            severity: 'error', summary: 'Error',
            detail: 'El rango de horas no coinciden con el número de creditos u horas de la materia'
          });
          //this.correct = false;
        }

      }
    }
  }

  val(event) {
    let da = event.toString().split(' ');
    console.log('fecha', da);
    switch (da[0]) {
      case 'Mon' :
        this.reserva.dia = 'Lunes';
        break;

      case 'Tue' :
        this.reserva.dia = 'Martes';

        break;

      case 'Wed' :
        this.reserva.dia = 'Miercoles';

        break;

      case 'Thu' :
        this.reserva.dia = 'Jueves';

        break;

      case 'Fri' :
        this.reserva.dia = 'Viernes';

        break;

      case 'Sat' :
        this.reserva.dia = 'Sabado';

        break;
    }
    console.log('dia', this.reserva.dia);
  }

  val1(event) {
    let da = event.toString().split(' ');
    switch (da[1]) {
      case 'Jan' :
        this.reserva.fecha = 'Enero ' + da[2] + ' ' + da[3];
        break;

      case 'Feb' :
        this.reserva.fecha = 'Febrero ' + da[2] + ' ' + da[3];
        break;

      case 'Mar' :
        this.reserva.fecha = 'Marzo ' + da[2] + ' ' + da[3];
        break;

      case 'Apr' :
        this.reserva.fecha = 'Abril ' + da[2] + ' ' + da[3];
        break;

      case 'May' :
        this.reserva.fecha = 'Mayo ' + da[2] + ' ' + da[3];
        break;

      case 'Jun' :
        this.reserva.fecha = 'Junio ' + da[2] + ' ' + da[3];
        break;

      case 'Jul' :
        this.reserva.dia = 'Julio ' + da[2] + ' ' + da[3];
        break;

      case 'Aug' :
        this.reserva.fecha = 'Agosto ' + da[2] + ' ' + da[3];
        break;

      case 'Sep' :
        this.reserva.fecha = 'Septiembre ' + da[2] + ' ' + da[3];
        break;

      case 'Oct' :
        this.reserva.fecha = 'Octubre ' + da[2] + ' ' + da[3];
        break;

      case 'Nov' :
        this.reserva.fecha = 'Noviembre ' + da[2] + ' ' + da[3];
        break;

      case 'Dec' :
        this.reserva.fecha = 'Diciembre ' + da[2] + ' ' + da[3];
        break;
    }
    console.log('mes', this.reserva.fecha);
  }

  cruz() {
    for (let i = 0; i < this.horarios.length; i++) {
      for (let m = 0; m < this.horarios[i].nombreAula.length; m++) {
        if (this.horarios[i].nombreAula[m] == this.reserva.aula) {
          console.log('aula igual');
          for (let j = 0; j < 7; j++) {
            if (this.horarios[i].dias[j] == this.reserva.dia) {
              console.log('dia igual');
              for (let k = 0; k < 7; k++) {
                if (this.horarios[i].horaInicios[k] == this.reserva.horaInicio || this.reserva.horaInicio < this.horarios[i].horaFins[k]) {
                  this.msgs = [];
                  this.msgs.push({
                    severity: 'error', summary: 'Error', detail: 'Aula o laboratorio ocupado, por favor ' +
                      'seleccione otro o cambie las horas o día'
                  });
                  //this.permision = false;
                } else {
                  this.msgs = [];
                  this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Aula o laboratorio libre, continue con el proceso'});
                  //this.permision = true;
                }
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
            console.log('hora incorrecta');
            this.msgs = [];
            this.msgs.push({
              severity: 'error', summary: 'Error', detail: 'Aula o laboratorio ocupado, por favor ' +
                'seleccione otro o cambie las horas o día'
            });
            this.permision = false;
          } else {
            this.msgs = [];
            this.msgs.push({severity: 'success', summary: 'Correcto', detail: 'Aula o laboratorio libre, continue con el proceso'});
            this.permision = true;
          }
        }
      }
    }
  }
}
