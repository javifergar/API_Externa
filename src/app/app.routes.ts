import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Listado de usuarios' },
  {
    path: 'user/:id',
    component: UserViewComponent,
    title: 'Detalle de usuario',
  },

  {
    path: 'updateuser',
    component: UpdateUserComponent,
    title: 'Nuevo usuario',
  },

  {
    path: 'updateuser/:id',
    component: UpdateUserComponent,
    title: 'Actualizar usuario',
  },

  { path: '**', redirectTo: 'home' },
];
