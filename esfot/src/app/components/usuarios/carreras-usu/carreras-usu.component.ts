import { Component, OnInit } from '@angular/core';
import {Materias} from '../../../interfaces/materias.interface';
import {DocentService} from '../../../services/docent.service';
import {MessageService} from 'primeng/api';
import {Carreras} from '../../../interfaces/carreras.interface';

@Component({
  selector: 'app-carreras-usu',
  templateUrl: './carreras-usu.component.html',
  styleUrls: ['./carreras-usu.component.css']
})
export class CarrerasUsuComponent implements OnInit {
  materias: Materias[] = [];
  checked: boolean = false;
  cols: any[];
  index: any;
  val: string = 'Option 1';
  carreras: Carreras [] = [];
  selectedMate: Materias;

  constructor(private _docentService: DocentService, private messageService: MessageService) {
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

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'm', sticky: true, severity: 'warn', summary: 'Esta seguro ?',
      detail: 'Confirme para proceder con la eliminación de todas las materias'});
  }

  /*onConfirm() {
    this.messageService.clear('m');
    this.elminiarTodo();
  }*/

  traerIndex(materia: Materias) {
    this.selectedMate = materia;
    console.log(this.selectedMate);
    this.index = this.materias.indexOf(this.selectedMate);
    console.log('p', this.index);
  }

  onReject() {
    this.messageService.clear('m');
  }
  ngOnInit() {
    this.cols = [
      { field: 'nombreMat', header: 'Materia' },
      { field: 'codigo', header: 'Código' },
      { field: 'semestre', header: 'Semestre o Nivel' },
      { field: 'creditos', header: 'Créditos' },
      { field: 'cd', header: 'Componente de Docencia' },
      { field: 'cp', header: 'Componente Práctico' },
      { field: 'carreras', header: 'Carreras' },

    ];
  }

  /*eliminar(id: string) {
    this._adminService.eliminarMateria(id)
      .subscribe(
        resultados => {
          this.materias = this.materias.filter((val, i) => i != this.index);
          //this.materias.splice(index, 1);
        }
      );
  }

  elminiarTodo() {
    console.log('todo');
    this._adminService.eliminarMaterias()
      .subscribe(
        resultados => {
          delete this.materias;
        }
      );
  }*/

}
