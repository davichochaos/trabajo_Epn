import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DocentService} from '../../../services/docent.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {

  constructor(private _router: Router, private _docentService: DocentService) { }

  ngOnInit() { this._docentService.isLogged().then((result: boolean) => {
    if (!result) {
      this._router.navigate(['/inicio']);
    }
  });
  }
  salirAd() {
    localStorage.removeItem('Docent');
    this._router.navigate(['/inicio']);
  }
}
