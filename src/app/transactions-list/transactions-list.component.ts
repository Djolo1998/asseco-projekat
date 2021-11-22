import { ApiService } from './../services/api.service';
import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { tableHeaders, kinds, transactionKindsParameter } from './shared';

import { mapTransactions, getSortDetailsFromArray, sortData } from './util';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
})
export class TransactionsListComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {}

  getCategoryName = (code: string) => {
    return this.categoryService.getCategoryData(code).name;
  };

  transactionIdToChage: any;

  transaction: any;

  transactions: any[] = [];

  paginations: any = {};

  multiSortMeta: any = [];

  displayDialog = false;

  enableMultypeSelection: boolean = false;

  showTreeMapChart: boolean = false;

  showHideTreeMapChart = () => {
    this.showTreeMapChart = !this.showTreeMapChart;
  };
  //

  selectedTransactions: any[] = [];

  //split
  displaySplitDialog = false;

  transactionToSplit = null;

  tableHeaders = tableHeaders;

  selectedKind = undefined;

  kinds = kinds;

  //

  handleOkMultypleTransactionDialog = () => {
    if (this.selectedTransactions.length < 1) return;
    this.displayDialog = true;
  };
  handleCancelMultypleTransactionDialog = () => {
    this.enableMultypeSelection = false;
  };

  onCategorizeMultypleBtnClicked = () => {
    this.enableMultypeSelection = !this.enableMultypeSelection;
  };

  onHideDialogClicked = (event: any) => {
    this.displayDialog = false;
  };

  onCloseSplitDialogClicked = (event: any) => {
    this.displaySplitDialog = false;
  };

  onAddCategoryClicked = (transaction: any) => {
    this.transactionIdToChage = transaction.id;
    this.transaction = transaction;
    this.displayDialog = true;
  };

  onSplitClicked = (transaction: any) => {
    this.transactionToSplit = transaction;
    this.displaySplitDialog = true;
  };

  handleCategorySelectedChange = (event: any) => {
    const { value } = event;
  };

  handleOnLazyLoad = (event: any) => {
    const { first, rows, multiSortMeta } = event;
    if (!rows) return;

    let sortBy = '';
    let sortOrder = '';
    if (multiSortMeta && multiSortMeta.length) {
      const details = getSortDetailsFromArray(multiSortMeta);
      sortBy = details.sortBy;
      sortOrder = details.sortOrder;
    }

    let page = (first + rows) / rows;
    const paginationParams: any = {
      page,
      'page-size': rows,
      'sort-by': sortBy,
      'sort-order': sortOrder,
    };

    if (this.selectedKind)
      paginationParams[transactionKindsParameter] = this.selectedKind;

    console.log('handleOnLazyLoad....', event);
    console.log('current page ', page);

    this.apiService.getTransactions(paginationParams).subscribe((data: any) => {
      this.transactions = data.items
        .map(mapTransactions)
        .sort(sortData(multiSortMeta));
      this.paginations = data;
    });
  };

  ngOnInit(): void {
    //set default table sortings

    this.multiSortMeta = [
      {
        field: 'date',
        order: -1,
      },
      {
        field: 'catcode',
        order: 1,
      },
    ];
    const { sortBy, sortOrder } = getSortDetailsFromArray(this.multiSortMeta);
    const onIntParams = { 'sort-by': sortBy, 'sort-order': sortOrder };

    this.apiService.getTransactions(onIntParams).subscribe((data: any) => {
      this.transactions = data.items
        .map(mapTransactions)
        .sort(sortData(this.multiSortMeta));
      this.paginations = data;
      console.log('this.transactions', this.transactions);
      console.log('this.paginations', this.paginations);
    });
  }
}
