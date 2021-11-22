import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chart-date-filter',
  templateUrl: './chart-date-filter.component.html',
  styleUrls: ['./chart-date-filter.component.css'],
})
export class ChartDateFilterComponent implements OnInit {
  constructor() {}

  @Input() filterDateValue: any;

  @Input() handleFilterBtnClicked: any;

  // handleFilterBtnClicked = () => {
  //   console.log('filter clicked.....');
  // };

  ngOnInit(): void {}
}
