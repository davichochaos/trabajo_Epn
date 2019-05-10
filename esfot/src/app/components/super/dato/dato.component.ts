import { Component, OnInit } from '@angular/core';
import {Carreras} from '../../../interfaces/carreras.interface';
import {Docentes} from '../../../interfaces/docentes.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {SuperService} from '../../../services/super.service';
declare function require(path: string): any;


@Component({
  selector: 'app-dato',
  templateUrl: './dato.component.html',
  styleUrls: ['./dato.component.css']
})
export class DatoComponent implements OnInit {

  carrerasx: Carreras[] = [];
  id: string;
  usuario: Docentes = {
    nombreDocent: "",
    cargo: "",
    correo: "",
    password: "",
    carreras: [],
  }

  constructor(private _superServices: SuperService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute ) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._superServices.getUsuario(this.id)
              .subscribe(
                resultado => {
                  this.usuario = resultado;
                }
              );
          }
        }
      );

    this._superServices.consultarCarreras()
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
      this._superServices.nuevoUsuario(this.usuario)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/usuario', resultado.name]);
          }
        );
    } else {
      this._superServices.editarUsuario(this.usuario, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/admin' ]);
          }
        );
    }
  }

}
