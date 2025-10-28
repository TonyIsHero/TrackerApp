import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard } from './Auth/AuthGuard/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'auth',
        pathMatch:'full'
    },
    {
        path:'auth',
        loadChildren:() =>import('./Auth/auth.module').then(m=>m.AuthModule)
    },
    {
        path: 'dashboard',
        canActivate:[authGuard],
        loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    }
];
