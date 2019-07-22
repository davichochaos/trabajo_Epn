import { Component, OnInit } from '@angular/core';
import {Administrador} from '../../../interfaces/administrador.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {SuperadService} from '../../../services/superad.service';
declare function require(path: string): any;
import SimpleCrypto from 'simple-crypto-js';
@Component({
  selector: 'app-administrador1',
  templateUrl: './administrador1.component.html',
  styleUrls: ['./administrador1.component.css']
})
export class Administrador1Component implements OnInit {

  pass: any;
  id: string;
  admini: Administrador = {
    nombreDocent: "",
    cargo: "Administrador",
    correo: "",
    password: "",
  }
  constructor(private _adminServices: SuperadService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params
      .subscribe(
        parametros => {
          this.id = parametros['id'];
          if (this.id !== 'nuevo') {
            this._adminServices.getAdmin(this.id)
              .subscribe(
                resultado => {
                  this.admini = resultado;
                }
              );
          }
        }
      );
  }

  ngOnInit() {
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
    this.admini.password = chiperText;
    console.log('Cipher Text   : ' + chiperText);
    console.log(this.admini.password);
  }

  guardar() {
    if (this.id == 'nuevo') {
      // guardar usuario nuevo
      this._adminServices.nuevoAdmin(this.admini)
        .subscribe(
          resultado => {
            console.log(resultado.name);
            this._router.navigate(['/admin', resultado.name]);
          }
        );
    } else {
      this._adminServices.editarAdmin(this.admini, this.id)
        .subscribe(
          resultado => {
            this._router.navigate(['/super' ]);
          }
        );
    }
  }

  clean() {
    this.admini.cargo = 'Administrador';
    this.admini.correo = '';
    this.admini.nombreDocent = '';
    this.admini.password = '';
  }

}
