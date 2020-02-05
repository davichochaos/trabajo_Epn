import {Component, OnInit} from '@angular/core';
import {Docentes} from '../../../interfaces/docentes.interface';
import {AdminService} from '../../../services/admin.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Carreras} from '../../../interfaces/carreras.interface';

declare function require(path: string): any;

import SimpleCrypto from 'simple-crypto-js';
import {Materias} from '../../../interfaces/materias.interface';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  carrerasx: Carreras[] = [];
  pass: any;
  id: string;

  date2: Date;
  es: any;

  mater: SelectItem[];
  materias: Materias[] = [];

  usuario: Docentes = {
    nombreDocent: '',
    apellidoDocent: '',
    cargo: 'Docente',
    correo: '',
    password: '',
    carreras: [],
    materias: [],
    fechaNacimiento: '',
    edadDocent: null,
  };

  constructor(private _usuarioServices: AdminService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._usuarioServices.getUsuario(this.id)
              .subscribe(
                resultado => {
                  this.usuario = resultado;
                }
              );
          }
        }
      );


    /*this.cars = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Ford', value: 'Ford'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'}
    ];*/

    this._usuarioServices.consultarCarreras()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.carrerasx.push(usuarioNew);
          }
          return this.carrerasx;
        }
      );
  }

  materiasUsu() {
    this.materias = [];
    this._usuarioServices.consultarMaterias()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const materiaNew = resultados[key$];
            materiaNew.id = key$;
            for (let i = 0; i < materiaNew.carreras.length; i++) {
              if (materiaNew.carreras[i] == this.usuario.carreras) {
                this.materias.push(materiaNew);
                console.log('materias', this.materias);
              }
            }
            //this.materias.push(materiaNew);
          }
          this.populateDropdown();
          return this.materias;
        }
      );
  }

  populateDropdown() {
    this.mater = [];
    const data = this.materias;
    for (let i = 0; i < data.length; i++) {
      this.mater.push({label: data[i].nombreMat, value: data[i].nombreMat});
      console.log('datos', this.mater);
    }
  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'DD/MM/yy'
    };
  }

  val1(event) {
    let fechaActu = new Date();
    let anioActua = fechaActu.getFullYear();
    let da = event.toString().split(' ');
    let anio = +da[3];
    let edad = 0;
    edad = anioActua - anio;
    this.usuario.edadDocent = edad;
    console.log('edad1', this.usuario.edadDocent);
  }

  val(event) {
    let da = event.toString().split(' ');
    switch (da[1]) {
      case 'Jan' :
        this.usuario.fechaNacimiento = 'Enero ' + da[2] + ' ' + da[3];
        break;

      case 'Feb' :
        this.usuario.fechaNacimiento = 'Febrero ' + da[2] + ' ' + da[3];
        break;

      case 'Mar' :
        this.usuario.fechaNacimiento = 'Marzo ' + da[2] + ' ' + da[3];
        break;

      case 'Apr' :
        this.usuario.fechaNacimiento = 'Abril ' + da[2] + ' ' + da[3];
        break;

      case 'May' :
        this.usuario.fechaNacimiento = 'Mayo ' + da[2] + ' ' + da[3];
        break;

      case 'Jun' :
        this.usuario.fechaNacimiento = 'Junio ' + da[2] + ' ' + da[3];
        break;

      case 'Jul' :
        this.usuario.fechaNacimiento = 'Julio ' + da[2] + ' ' + da[3];
        break;

      case 'Aug' :
        this.usuario.fechaNacimiento = 'Agosto ' + da[2] + ' ' + da[3];
        break;

      case 'Sep' :
        this.usuario.fechaNacimiento = 'Septiembre ' + da[2] + ' ' + da[3];
        break;

      case 'Oct' :
        this.usuario.fechaNacimiento = 'Octubre ' + da[2] + ' ' + da[3];
        break;

      case 'Nov' :
        this.usuario.fechaNacimiento = 'Noviembre ' + da[2] + ' ' + da[3];
        break;

      case 'Dec' :
        this.usuario.fechaNacimiento = 'Diciembre ' + da[2] + ' ' + da[3];
        break;
    }
    console.log('mes', this.usuario.fechaNacimiento);
  }

  password() {
    const password = require('generate-password');
    this.pass = password.generate({
      length: 10,
      numbers: true
    });

    const _secretKey = 'some-unique-key';
    const simpleCrypto = new SimpleCrypto(_secretKey);
    const plainText = this.pass;
    const chiperText = simpleCrypto.encrypt(plainText);
    this.usuario.password = chiperText;
    console.log('Cipher Text   : ' + chiperText);
    console.log(this.usuario.password);
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._usuarioServices.nuevoUsuario(this.usuario)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/usuario', resultado.name]);
          }
        );
    } else {
      this._usuarioServices.editarUsuario(this.usuario, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin']);
          }
        );
    }
  }

  clean() {
    this.usuario.cargo = 'Docente';
    this.usuario.carreras = [];
    this.usuario.correo = '';
    this.usuario.nombreDocent = '';
    this.usuario.password = '';
  }

  cifrar() {

  }
}
