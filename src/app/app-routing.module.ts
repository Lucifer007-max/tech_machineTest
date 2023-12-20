import { AuthGuard } from './core/guard/authguard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  // Public Routes
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
      }
    ]
  },
  // Private Routes
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate:[AuthGuard]
      },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
        canActivate:[AuthGuard]
      },
      {
        path: 'movie-list',
        loadComponent: () => import('./pages/movielist/movielist.component').then(m => m.MovielistComponent),
        canActivate:[AuthGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
