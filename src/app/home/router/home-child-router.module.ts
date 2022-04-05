// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

// Pages & Extras
import { DashboardComponent } from '../pages/dashboard/dashboard.component'
import { MenuComponent } from '../pages/menu/menu.component';
import { MenuDetailsComponent } from '../pages/menu-details/menu-details.component';
import { AdministratorsComponent } from '../pages/administrators/administrators.component';
import { AdministratorsDetailsComponent } from '../pages/administrators-details/administrators-details.component';
import { homeReducer } from '../store/home.reducers'

const childRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:id', component: MenuDetailsComponent },
  { path: 'administrators', component: AdministratorsComponent },
  { path: 'administrators/:id', component: AdministratorsDetailsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes), StoreModule.forFeature('home', homeReducer)],
  exports: [RouterModule]
})
export class HomeChildRouterModule { }
