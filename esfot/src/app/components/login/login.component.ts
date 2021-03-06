import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docentes } from '../../interfaces/docentes.interface';
import { AdminService } from '../../services/admin.service';
import { DocentService } from '../../services/docent.service';
import { Message } from 'primeng/primeng';
import {SuperadService} from '../../services/superad.service';
import {getLocaleDateFormat} from '@angular/common';
declare function require(path: string): any;
import SimpleCrypto from 'simple-crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  password: any;
  correo: any;
  anioActual: any;
  mesActual: any;
  diaActual: any;
  password1: any;
  correo1: any;
  hora: any;
  minute: any;
  claveCif: any;

  constructor(private _router: Router, private _adminServices: AdminService,
              private _docenteServices: DocentService,
              private _superServices: SuperadService) {
  }

  ngOnInit() {
    this._adminServices.isLogged().then((result: boolean) => {
      if (result) {
        this._router.navigate(['/admin']);
      }
    });

    this._docenteServices.isLogged().then((result: boolean) => {
      if (result) {
        this._router.navigate(['/docent']);
      }
    });

    this._superServices.isLogged().then((result: boolean) => {
      if (result) {
        this._router.navigate(['/super']);
      }
    });

    this.anioActual = new Date().getFullYear();
    const d = new Date();
    const mes = new Array();
    mes[0] = 'Enero';
    mes[1] = 'Febrero';
    mes[2] = 'Marzo';
    mes[3] = 'Abril';
    mes[4] = 'Mayo';
    mes[5] = 'Junio';
    mes[6] = 'Julio';
    mes[7] = 'Agosto';
    mes[8] = 'Septiembre';
    mes[9] = 'Octubre';
    mes[10] = 'Noviembre';
    mes[11] = 'Diciembre';
    this.mesActual = mes[d.getMonth()];
    this.diaActual = d.getDate();
    this.hora = this.addZero(d.getHours());
    this.minute = this.addZero(d.getMinutes());
    //console.log(this.diaActual);
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  cifrar() {
    const _secretKey = 'some-unique-key';
    const simpleCrypto = new SimpleCrypto(_secretKey);
    const plainText = 'superadmin';
    const chiperText = simpleCrypto.encrypt(plainText);
    this.claveCif = chiperText;
    console.log('Cipher Text   : ' + chiperText);
    console.log('Cipher Text   : ' + plainText);
  }

  entrar() {
    const secretKey = 'some-unique-key';
    const simpleCrypto = new SimpleCrypto(secretKey);
    this._superServices.consultarAdmins().subscribe(
      res => {
        for (const key$ in res) {
          const adminNew = res[key$];
          adminNew.id = res[key$].id;
          const decipherText = simpleCrypto.decrypt(adminNew.password);
          if (adminNew.correo === this.correo1 &&
            decipherText === this.password1 &&
            adminNew.cargo === 'SuperAdmin') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(adminNew);
              localStorage.setItem('Super', usuarioGuar);
            }
            this._router.navigate(['/super']);
          } else if (adminNew.correo === this.correo1 &&
            decipherText === this.password1 &&
            adminNew.cargo === 'Administrador') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(adminNew);
              localStorage.setItem('Admin', usuarioGuar);
            }
            this._router.navigate(['/admin']);
          } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecta'});
          }
        }
      }
    );

    this._adminServices.consultarUsuarios().subscribe(
      res => {
        for (const key$ in res) {
          const usuarioNew = res[key$];
          usuarioNew.id = res[key$].id;
          const decipherText = simpleCrypto.decrypt(usuarioNew.password);
          /*if (usuarioNew.correo === this.correo1 &&
            usuarioNew.password === this.password1 &&
            usuarioNew.cargo === 'SuperAdmin') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Super', usuarioGuar);
            }
            this._router.navigate(['/super']);
          } else if (usuarioNew.correo === this.correo1 &&
            usuarioNew.password === this.password1 &&
            usuarioNew.cargo === 'Administrador') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Admin', usuarioGuar);
            }
            this._router.navigate(['/admin']);
          } else*/
          if (usuarioNew.correo === this.correo1 &&
            decipherText === this.password1 &&
            usuarioNew.cargo === 'Docente') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Docent', usuarioGuar);
            }
            this._router.navigate(['/docent']);
          } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecta'});
          }
        }
      }
    );
  }

  login() {
    this._adminServices.consultarUsuarios().subscribe(
      respuesta => {
        for (const key$ in respuesta) {
          const usuarioNew = respuesta[key$];
          usuarioNew.id = respuesta[key$].id;
          if (usuarioNew.correo === this.correo && usuarioNew.password === this.password && usuarioNew.cargo === 'Administrador') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Admin', usuarioGuar);
              //console.log(respuesta[key$].id);
            }
            this._router.navigate(['/admin']);
          } else if (usuarioNew.correo === this.correo && usuarioNew.password === this.password && usuarioNew.cargo === 'Docente') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Docent', usuarioGuar);
              //console.log(usuarioNew.id);
            }
            this._router.navigate(['/docent']);
          } else if (usuarioNew.correo === this.correo && usuarioNew.password === this.password && usuarioNew.cargo === 'SuperAdmin') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Super', usuarioGuar);
              //console.log(respuesta[key$].id);
            }
            this._router.navigate(['/super']);
          } else {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecta'});
          }

        }
        //return this.listaUsuarios;
      });
  }
}
