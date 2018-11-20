import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Docentes } from '../../interfaces/docentes.interface';
import { AdminService } from '../../services/admin.service';
import { DocentService } from '../../services/docent.service';
import { Message } from 'primeng/primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  usuarios: Docentes = {
    nombreDocent: "",
    cargo: "",
    correo: "",
    password: "",
    carreras: [],
  }


  constructor(private _router: Router, private _usuarioServices: AdminService, private _docenteServices: DocentService) { }

  ngOnInit() {
    this._usuarioServices.isLogged().then((result: boolean) => {
      if (result) {
        this._router.navigate(['/admin']);
      }
    });

    this._docenteServices.isLogged().then((result: boolean) => {
      if (result) {
        this._router.navigate(['/docent']);
      }
    });
  }

  login(usuario, contra) {
    this._usuarioServices.consultarUsuarios().subscribe(
      respuesta => {
        for (const key$ in respuesta) {
          const usuarioNew = respuesta[key$];
          usuarioNew.id = respuesta[key$].id;
          if (usuarioNew.correo === usuario && usuarioNew.password === contra && usuarioNew.cargo === 'Administrador') {
            if (typeof(Storage) !== 'undefined') {
              sessionStorage.setItem('Admin', this.usuarios.correo);
            }
            this._router.navigate(['/admin']);
          } else if (usuarioNew.correo === usuario && usuarioNew.password === contra && usuarioNew.cargo === 'Docente') {
            if (typeof(Storage) !== 'undefined') {
              sessionStorage.setItem('Docent', this.usuarios.correo);
            }
            this._router.navigate(['/docent']);
          } else {
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:'Usuario o contraseña incorrecta'});
          }

        }
        //return this.listaUsuarios;
      });
  }

  //hora2() {
    //let text= (<HTMLInputElement> document.getElementById("inicio")).value.replace(':','0');

    //let horaDesde = (document.getElementById("inicio") as HTMLInputElement).value.replace(':','0');
    //let horaHasta = (document.getElementById("final")as HTMLInputElement).value.replace(':','0');
    //if (Date.parse(horaDesde) > Date.parse(horaHasta)) {
      //alert('¡La hora de término no puede ser anterior a la hora de inicio!');
      //return 0;
    //} else {
      //alert('¡La hora!');
      //return 0;
    //}
  //}

}
