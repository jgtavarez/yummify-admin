import { Component, OnInit } from '@angular/core';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { Sidebar } from '../../interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  sidebar: Sidebar[] = [
    { icon: faChartPie, text: 'Dashboard', url: '/dashboard' },
    { icon: faChartPie, text: 'Menu', url: '/menu' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
