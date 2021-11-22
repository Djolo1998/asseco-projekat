import { CategoryService } from './../services/category.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-split-transaction-dialog',
  templateUrl: './split-transaction-dialog.component.html',
  styleUrls: ['./split-transaction-dialog.component.css'],
})
export class SplitTransactionDialogComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {}

  @Input() transactionToSplit: any;

  @Input() display: any;

  @Output() onCloseSplitDialogClicked = new EventEmitter();

  @Input() transactions: any;

  handleSplitDialogClosed = () => {
    this.onCloseSplitDialogClicked.emit();
  };

  handleSplitCancel = () => {
    this.onCloseSplitDialogClicked.emit();
  };

  handleSplitApply = () => {
    let data = this.splitArray.map((x) => {
      let catcode = x.selectedSubCategory
        ? x.selectedSubCategory
        : x.selectedCategory;
      let amount = x.amount;

      return { catcode: catcode.toString(), amount };
    });

    let dataToSend = { splits: data };

    this.apiService
      .splitTransaction(this.transactionToSplit.id, dataToSend)
      .subscribe((data) => {
        const dataToChangeFront = dataToSend.splits.map((x: any) => {
          x.amount = this.transactionToSplit.currency + ' ' + x.amount;
          return x;
        });
        this.transactions.filter(
          (x: any) => x.id == this.transactionToSplit.id
        )[0].splits = dataToChangeFront;
        this.display = false;
      });
  };

  categoriesOptions: any[] = [];

  handleCategorySelectedChange = (event: any, index: number) => {
    const { value } = event;
    this.splitArray[index].subCategoriesOptions =
      this.categoryService.getSubCategory(value);

    this.splitArray[index].selectedSubCategory = null;
    this.updateIsAllowedToSplit();
  };

  amountToBeEqual: number = 0;

  needToBeEqual: number = 0;

  isAllowedToSplit = false;

  splitOptionDefault = {
    selectedCategory: null,
    selectedSubCategory: null,
    amount: 0,
    subCategoriesOptions: [],
  };

  splitArray: any[] = [
    { ...this.splitOptionDefault },
    { ...this.splitOptionDefault },
  ];

  updateIsAllowedToSplit = () => {
    let isEvry = this.splitArray.every((x) => x.selectedCategory);
    let currentTotal = this.splitArray.reduce((a, b) => a + b.amount, 0);
    let needToBeEqual = currentTotal - this.amountToBeEqual;
    let isEqualToAmount =
      this.amountToBeEqual == this.splitArray.reduce((a, b) => a + b.amount, 0);

    //
    let checkIfEqualString = needToBeEqual.toFixed(2) == '0.00';

    this.isAllowedToSplit = isEvry && (isEqualToAmount || checkIfEqualString);

    this.needToBeEqual = needToBeEqual;
  };

  handleOnInput = (event: any) => {
    this.updateIsAllowedToSplit();
  };

  addSplitOption = () => {
    this.splitArray.push({ ...this.splitOptionDefault });
    this.updateIsAllowedToSplit();
  };
  deleteSplitOption = (index: number) => {
    this.splitArray.splice(index, 1);
    this.updateIsAllowedToSplit();
  };

  getAmountFromAmountString = (amountString: string) => {
    return Number(amountString.split(' ')[1]);
  };

  getSplitDataFromTransaction = (transactionToSplit: any) => {
    let splitsData = this.transactionToSplit.splits.map((split: any) => {
      let { catcode, amount } = split;
      let selectedSubCategory = null;
      let selectedCategory = catcode;
      let isSubCategorySelected = this.categoryService.isSubCategory(catcode);
      if (isSubCategorySelected) {
        selectedCategory =
          this.categoryService.getCategoryData(catcode)['parent-code'];

        selectedSubCategory = catcode;
      }
      return {
        selectedCategory,
        selectedSubCategory,
        amount: this.getAmountFromAmountString(amount),
        subCategoriesOptions:
          this.categoryService.getSubCategory(selectedCategory),
      };
    });

    return splitsData;
  };

  ngOnInit(): void {
    if (this.transactionToSplit.splits.length > 0) {
      this.splitArray = this.getSplitDataFromTransaction(
        this.transactionToSplit
      );
    }

    this.categoriesOptions = this.categoryService.extractCategories();

    this.amountToBeEqual = Number(this.transactionToSplit.amount.split(' ')[1]);
    // this.amountToBeEqual = this.transactionToSplit.amount;
  }
}
