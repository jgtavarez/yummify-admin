import { Component, OnInit } from '@angular/core';
import { faReceipt, faCoins, faUser } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  faReceipt = faReceipt;
  faDollarSign = faCoins;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
