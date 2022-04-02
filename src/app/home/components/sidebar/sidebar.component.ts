import { Component, OnInit } from '@angular/core';
import { faChartPie, faPizzaSlice, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sidebar } from '../../interfaces';
import { AppState } from '../../../app.reducer';
import { Admin } from '../../../shared/models/admin.model';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  admin!: Admin;
  faPowerOff = faPowerOff;

  sidebar: Sidebar[] = [
    { icon: faChartPie, text: 'Dashboard', url: '/dashboard' },
    { icon: faPizzaSlice, text: 'Menu', url: '/menu' },
  ];

  private _subscription!: Subscription;
  constructor(private store: Store<AppState>, private authService: AuthService) {
    this.store.select('auth').subscribe(({ admin }) => {
      this.admin = admin;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

}
