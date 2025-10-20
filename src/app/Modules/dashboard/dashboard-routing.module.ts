import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FitnessComponent } from '../fitness/fitness.component';
import { ExpenseComponent } from '../expense/expense.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {path:'fitness', component: FitnessComponent},
      {path:'expense',component:ExpenseComponent},
      { path: '', redirectTo: 'fitness', pathMatch: 'full' }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
