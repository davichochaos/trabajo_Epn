import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';

//administrador
import {UsuarioComponent} from './components/admin/usuario/usuario.component';
import {HorarioComponent} from './components/admin/horario/horario.component';
import {CarreraComponent} from './components/admin/carrera/carrera.component';
import {MateriaComponent} from './components/admin/materia/materia.component';
import {AulaComponent} from './components/admin/aula/aula.component';
import {AdministradorComponent} from './components/admin/administrador/administrador.component';
import {ReservaAdminComponent} from './components/admin/reserva-admin/reserva-admin.component';


//usuarios
import {PerfilComponent} from './components/usuarios/perfil/perfil.component';
import {ReservaComponent} from './components/usuarios/reserva/reserva.component';
import {DocentesComponent} from './components/usuarios/docentes/docentes.component';
import {SuperComponent} from './components/super/home/super.component';
import {Administrador1Component} from './components/super/administrador1/administrador1.component';

const APP_ROUTES: Routes = [
  {path: 'inicio', component: LoginComponent},

  /*admin*/
  {path: 'admin', component: AdministradorComponent},
  {path: 'usuario/:id', component: UsuarioComponent},
  {path: 'horarioadmin/:id', component: HorarioComponent},
  {path: 'carrera/:id', component: CarreraComponent},
  {path: 'aula/:id', component: AulaComponent},
  {path: 'materia/:id', component: MateriaComponent},
  {path: 'reserva/:id', component: ReservaAdminComponent},

// super
  {path: 'super', component: SuperComponent},
  {path: 'admin/:id', component: Administrador1Component},

  /*usuarios*/
  {path: 'docent', component: DocentesComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'reserva:id', component: ReservaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'},

];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
