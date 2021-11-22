import { ApiService } from './../services/api.service';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-map-chart',
  templateUrl: './tree-map-chart.component.html',
  styleUrls: ['./tree-map-chart.component.css'],
})
export class TreeMapChartComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {}

  apiData = null;

  currentlySelectedChart = 'doughnut';

  charts = ['doughnut', 'bar', 'tree-map'];

  convertDataToChartData = (data: any[]) => {
    return data.map((x) => {
      let catcode = x.catcode;
      let name = this.categoryService.getCategoryData(x.catcode).name;
      let value = x.amount;
      return { extra: { catcode }, name, value };
    });
  };

  chartMaxWidth = 700;
  chartWidth = window.innerWidth - 50;
  // chartWidth = window.innerWidth / 1.4;
  // chartWidth = 700;
  chartHeight = 400;

  chartData: any[] = [];
  gradient: boolean = false;
  animations: boolean = true;

  currentMonth = new Date().getMonth();
  firstDayOfMonth = new Date(Date.UTC(2021, this.currentMonth, 1));
  currentDate = new Date();

  barChart = {
    showXAxis: true,
    showYAxis: true,
    showLegend: true,
  };

  doughnut = {
    gradient: true,
    showLegend: true,
    showLabels: true,
    isDoughnut: false,
  };

  filterDateValue = {
    startDate: this.firstDayOfMonth,
    endDate: this.currentDate,
  };

  onResize(event: any) {
    this.chartWidth = event.target.innerWidth / 1.2;
    this.chartWidth =
      this.chartWidth >= this.chartMaxWidth
        ? this.chartMaxWidth
        : this.chartWidth;
  }

  handleFilterBtnClicked = () => {
    const params = this.getFilterDateObjectISOValues();
    this.apiService.getSpendingAnalytics(params).subscribe((data: any) => {
      this.apiData = data;
      this.chartData = this.convertDataToChartData(data.groups);
      this.showingSubCategoriesOnchart = false;
    });
  };

  handleDateSelected = (event: any) => {
    console.log('handleDateSelected', event.toISOString());
  };

  getFilterDateObjectISOValues = () => {
    return {
      'start-date': this.filterDateValue.startDate.toISOString(),
      'end-date': this.filterDateValue.endDate.toISOString(),
    };
  };

  showingSubCategoriesOnchart = false;

  onSelect(event: any) {
    //samo za test obrisati ovo posle getSpendingAnalyticsTest
    const { catcode } = event.extra;

    const params = { ...this.getFilterDateObjectISOValues(), catcode };

    if (!this.showingSubCategoriesOnchart) {
      this.apiService
        .getSpendingAnalytics({ ...params }, true)
        .subscribe((data: any) => {
          this.apiData = data;
          this.chartData = this.convertDataToChartData(data.groups);
        });
    }

    this.showingSubCategoriesOnchart = true;
  }

  ngOnInit(): void {
    const params = this.getFilterDateObjectISOValues();
    this.apiService.getSpendingAnalytics(params).subscribe((data: any) => {
      this.apiData = data;
      this.chartData = this.convertDataToChartData(data.groups);
    });
    if (this.chartWidth >= this.chartMaxWidth) {
      this.chartWidth = this.chartMaxWidth;
    }
  }
}
