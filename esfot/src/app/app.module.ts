import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MessagesModule, GrowlModule, CheckboxModule, PasswordModule, CalendarModule} from 'primeng/primeng';


//rutas
import {APP_ROUTING} from './app.routes';

//servicios

import {AdminService} from './services/admin.service';
import {DocentService} from './services/docent.service';
import {SuperService} from './services/super.service';


import { LoginComponent } from './components/login/login.component';
import { SuperComponent } from './components/super/super.component';


//administrador

import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { UsuarioComponent } from './components/admin/usuario/usuario.component';
import { AulasComponent } from './components/admin/aulas/aulas.component';
import { AulaComponent } from './components/admin/aula/aula.component';
import { HorariosComponent } from './components/admin/horarios/horarios.component';
import { HorarioComponent } from './components/admin/horario/horario.component';
import { AdministradorComponent } from './components/admin/administrador/administrador.component';
import { CarrerasComponent } from './components/admin/carreras/carreras.component';
import { CarreraComponent } from './components/admin/carrera/carrera.component';
import { MateriasComponent } from './components/admin/materias/materias.component';
import { MateriaComponent } from './components/admin/materia/materia.component';
import { ReservaAdminComponent } from './components/admin/reserva-admin/reserva-admin.component';

//usuarios
import { PerfilComponent } from './components/usuarios/perfil/perfil.component';
import { ReservaComponent } from './components/usuarios/reserva/reserva.component';
import { DocentesComponent } from './components/usuarios/docentes/docentes.component';
import { ReservasAdComponent } from './components/admin/reservas-ad/reservas-ad.component';
import { ReservasUsuComponent } from './components/usuarios/reservas-usu/reservas-usu.component';
import { DatosComponent } from './components/super/datos/datos.component';
import { DatoComponent } from './components/super/dato/dato.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    UsuarioComponent,
    AulasComponent,
    AulaComponent,
    HorariosComponent,
    HorarioComponent,
    PerfilComponent,
    ReservaComponent,
    AdministradorComponent,
    CarrerasComponent,
    CarreraComponent,
    MateriasComponent,
    MateriaComponent,
    DocentesComponent,
    ReservaAdminComponent,
    ReservasAdComponent,
    ReservasUsuComponent,
    SuperComponent,
    DatosComponent,
    DatoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    APP_ROUTING,
    HttpModule,
    HttpClientModule,
    MessagesModule,
    GrowlModule,
    CheckboxModule,
    PasswordModule,
    CalendarModule,
  ],
  providers: [
    AdminService,
    DocentService,
    SuperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
