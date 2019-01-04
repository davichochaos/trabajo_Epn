import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva-admin',
  templateUrl: './reserva-admin.component.html',
  styleUrls: ['./reserva-admin.component.css']
})
export class ReservaAdminComponent implements OnInit {

  date2: Date;
  es: any;
  day: any;
  constructor() {

  }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes',"martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom", 'lun',"mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar',
      dateFormat: 'DD/MM/yy'
    }


  }

  ver() {
    console.log(this.date2);
  }

  val(event){
    let da = event.toString().split(" ");
    console.log(da[0]);
    switch (da[0]) {
      case "Mon" :
        this.day  = "Lunes";
        break;

      case "Tue" :
        this.day  = "Martes";
        break;

      case "Wed" :
        this.day  = "Miercoles";
        break;

      case "Thu" :
        this.day  = "Jueves";
        break;

      case "Fri" :
        this.day  = "Viernes";
        break;

      case "Sat" :
        this.day  = "Sabado";
        break;
    }

    console.log(this.day);
  }


}
