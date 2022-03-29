import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styles: [
  ]
})
export class StatsCardComponent implements OnInit {
  @Input() icon!: IconDefinition;
  @Input() name: string = '';
  @Input() amount: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
