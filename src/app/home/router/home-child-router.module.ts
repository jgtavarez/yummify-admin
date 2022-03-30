// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { DashboardComponent } from '../pages/dashboard/dashboard.component'
import { MenuComponent } from '../pages/menu/menu.component';

const childRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'menu', component: MenuComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class HomeChildRouterModule { }
