import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(private _router: Router, private _adminService: AdminService) { }

  ngOnInit() {
    this._adminService.isLogged().then((result: boolean) => {
      if (!result) {
        this._router.navigate(['/inicio']);
      }
    });
  }
  salirAd() {
    localStorage.removeItem('Admin');
    this._router.navigate(['/inicio']);
  }

}
