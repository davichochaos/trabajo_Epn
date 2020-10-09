import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AdminService} from '../../../services/admin.service';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad') pdfViewerAutoLoad;
  @ViewChild('externalPdfViewer') public externalPdfViewer;
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    localStorage.clear();
  }

  public openPdf() {
    console.log("opening pdf in new tab!");
    this.externalPdfViewer.pdfSrc = "./../../../assets/Manual de Usuario.pdf";
    this.externalPdfViewer.refresh();
  }
  constructor(private _router: Router, private _adminService: AdminService, private http: HttpClient) {
    /*let url = "./../../../assets/sample.pdf"; // Or your url
    this.downloadFile(url).subscribe(
      (res) => {
        this.pdfViewerAutoLoad.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewerAutoLoad.refresh(); // Ask pdf viewer to load/refresh pdf
      }
    );*/
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  ngOnInit() {
    this._adminService.isLogged().then((result: boolean) => {
      if (!result) {
        this._router.navigate(['/inicio']);
      }
    });

    window.location.hash = " ";
    window.location.hash = " ";//esta linea es necesaria para chrome
    window.onhashchange =  function() {
      window.location.hash = " ";
    };
  }
  salirAd() {
    localStorage.removeItem('Admin');
    this._router.navigate(['/inicio']);
  }

  pruebaTab() {
    //const tab = (document.getElementById('pills-usuarios-tab1') as HTMLLinkElement).;
    console.log('prubas');
  }

}
