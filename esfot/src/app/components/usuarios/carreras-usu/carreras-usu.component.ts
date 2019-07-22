import { Component, OnInit } from '@angular/core';
import {Materias} from '../../../interfaces/materias.interface';
import {DocentService} from '../../../services/docent.service';

@Component({
  selector: 'app-carreras-usu',
  templateUrl: './carreras-usu.component.html',
  styleUrls: ['./carreras-usu.component.css']
})
export class CarrerasUsuComponent implements OnInit {
  materias: Materias[] = [];

  constructor(private _docentService: DocentService) {
    this._docentService.consultarMaterias()
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
  }

  ngOnInit() {
  }

}
