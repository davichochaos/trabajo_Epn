import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docentes } from '../../interfaces/docentes.interface';
import { AdminService } from '../../services/admin.service';
import { DocentService } from '../../services/docent.service';
import { Message } from 'primeng/primeng';
import {SuperadService} from '../../services/superad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  password: any;
  correo: any;

  password1: any;
  correo1: any;


  constructor(private _router: Router, private _adminServices: AdminService,
              private _docenteServices: DocentService,
              private _superServices: SuperadService ) { }

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
  }

  entrar() {

    this._superServices.consultarAdmins().subscribe(
      res => {
        for (const key$ in res ) {
          const adminNew = res[key$];
          adminNew.id = res[key$].id;
          if (adminNew.correo === this.correo1 &&
            adminNew.password === this.password1 &&
            adminNew.cargo === 'SuperAdmin') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(adminNew);
              localStorage.setItem('Super', usuarioGuar);
            }
            this._router.navigate(['/super']);
          } else if (adminNew.correo === this.correo1 &&
            adminNew.password === this.password1 &&
            adminNew.cargo === 'Administrador') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(adminNew);
              localStorage.setItem('Admin', usuarioGuar);
            }
            this._router.navigate(['/admin']);
          } else {
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:'Usuario o contraseña incorrecta'});
          }
        }
      }
    );

    this._adminServices.consultarUsuarios().subscribe(
      res => {
        for (const key$ in res) {
          const usuarioNew = res[key$];
          usuarioNew.id = res[key$].id;
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
          } else*/ if (usuarioNew.correo === this.correo1 &&
            usuarioNew.password === this.password1 &&
            usuarioNew.cargo === 'Docente') {
            if (typeof (Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Docent', usuarioGuar);
            }
            this._router.navigate(['/docent']);
          } else {
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:'Usuario o contraseña incorrecta'});
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
            if (typeof(Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Admin', usuarioGuar);
              //console.log(respuesta[key$].id);
            }
            this._router.navigate(['/admin']);
          } else if (usuarioNew.correo === this.correo && usuarioNew.password === this.password && usuarioNew.cargo === 'Docente') {
            if (typeof(Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Docent', usuarioGuar);
              //console.log(usuarioNew.id);
            }
            this._router.navigate(['/docent']);
          } else if (usuarioNew.correo === this.correo && usuarioNew.password === this.password && usuarioNew.cargo === 'SuperAdmin') {
            if (typeof(Storage) !== 'undefined') {
              const usuarioGuar = JSON.stringify(usuarioNew);
              localStorage.setItem('Super', usuarioGuar);
              //console.log(respuesta[key$].id);
            }
            this._router.navigate(['/super']);
          } else {
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:'Usuario o contraseña incorrecta'});
          }

        }
        //return this.listaUsuarios;
      });

  }

}
