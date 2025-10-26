import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [
    {
        path:'auth',
        redirectTo:'auth',
        pathMatch:'full'
    },
    {
        path:'auth',
        loadChildren:() =>import('./Auth/auth.module').then(m=>m.AuthModule)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    }
];
