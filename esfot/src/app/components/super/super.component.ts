import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SuperService} from '../../services/super.service';

@Component({
  selector: 'app-super',
  templateUrl: './super.component.html',
  styleUrls: ['./super.component.css']
})
export class SuperComponent implements OnInit {

  constructor(private _router: Router, private _superService: SuperService) { }

  ngOnInit() {
    this._superService.isLogged().then((result: boolean) => {
      if (!result) {
        this._router.navigate(['/inicio']);
      }
    });
  }

  salirAd() {
    localStorage.removeItem('Super');
    this._router.navigate(['/inicio']);
  }

}
