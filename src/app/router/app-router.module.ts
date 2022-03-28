// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouterModule } from '../auth/router/auth-router.module';
import { HomeRouterModule } from '../home/router/home-router.module';

// Components
import { NotFoundComponent } from '../shared/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    AuthRouterModule,
    HomeRouterModule
  ],
  exports: [RouterModule],
})
export class AppRouterModule { }
