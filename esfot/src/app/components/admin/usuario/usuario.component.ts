import { Component, OnInit } from '@angular/core';
import {Docentes} from '../../../interfaces/docentes.interface';
import {AdminService} from '../../../services/admin.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Carreras} from '../../../interfaces/carreras.interface';
declare function require(path: string): any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  carrerasx: Carreras[] = [];
  id: string;
  usuario: Docentes = {
    nombreDocent: "",
    cargo: "",
    correo: "",
    password: "",
    carreras: [],
  }

  constructor(private _usuarioServices: AdminService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute ) {
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

  ngOnInit() {
  }

  password() {
    const password = require('generate-password');
    this.usuario.password = password.generate({
      length: 10,
      numbers: true
    });
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
          this._router.navigate(['/admin' ]);
        }
      );
    }
  }
}
