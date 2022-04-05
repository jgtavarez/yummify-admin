// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/shared.module';

// Components
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { ColumnChartComponent } from './components/column-chart/column-chart.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuDetailsComponent } from './pages/menu-details/menu-details.component';
import { AdministratorsComponent } from './pages/administrators/administrators.component';
import { AdministratorsDetailsComponent } from './pages/administrators-details/administrators-details.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    SidebarComponent,
    StatsCardComponent,
    ColumnChartComponent,
    MenuComponent,
    MenuDetailsComponent,
    AdministratorsComponent,
    AdministratorsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgApexchartsModule
  ]
})
export class HomeModule { }
