import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';

import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';

import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SplitTransactionDialogComponent } from './split-transaction-dialog/split-transaction-dialog.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TreeMapChartComponent } from './tree-map-chart/tree-map-chart.component';
import { ChartDateFilterComponent } from './chart-date-filter/chart-date-filter.component';
import { NodeApiInterceptor } from './http-interceptors/node-api-interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    AddCategoryDialogComponent,
    SplitTransactionDialogComponent,
    TreeMapChartComponent,
    ChartDateFilterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AppRoutingModule,
    TableModule,
    DropdownModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    NgxChartsModule,
    CalendarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NodeApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
