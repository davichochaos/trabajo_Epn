import { Component, OnInit } from '@angular/core';
import {Docentes} from '../../../interfaces/docentes.interface';
import {Carreras} from '../../../interfaces/carreras.interface';
import {Router} from '@angular/router';
import {DocentService} from '../../../services/docent.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  campos: boolean = true;
  carrerasx: Carreras[] = [];
  id: string;
  usuarios: Docentes[] = [];
  usuario: Docentes = {
    nombreDocent: "",
    cargo: "",
    correo: "",
    password: "",
    carreras: [],
  }

  constructor(private _router: Router, private _docentService: DocentService) {
    this._docentService.consultarUsuarios()
      .subscribe(
        resultados => {
          for (const key$ in resultados) {
            const usuarioNew = resultados[key$];
            usuarioNew.id = key$;
            this.usuarios.push(usuarioNew);
          }
          return this.usuarios;
        }
      );
  }

  ngOnInit() {
    this.recuperar();

  }

  recuperar() {
    let usuarioGuar;
    usuarioGuar =  localStorage.getItem('Docent');
    usuarioGuar = JSON.parse(usuarioGuar);
    (document.getElementById('namee') as HTMLInputElement).value = usuarioGuar.nombreDocent;
    (document.getElementById('maill') as HTMLInputElement).value = usuarioGuar.correo;
    (document.getElementById('passwor') as HTMLInputElement).value = usuarioGuar.password;
    (document.getElementById('carg') as HTMLInputElement).value = usuarioGuar.cargo;
    (document.getElementById('carr') as HTMLInputElement).value = usuarioGuar.carreras;

  }

}
