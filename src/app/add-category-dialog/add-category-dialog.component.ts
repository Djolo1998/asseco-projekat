import { ApiService } from './../services/api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css'],
})
export class AddCategoryDialogComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private categoryService: CategoryService
  ) {}

  @Input() display: any;

  @Input() transactionId: any;

  @Input() transaction: any;

  @Input() isForMultypleTransactions: boolean = false;

  @Input() transactionsIdArray: any[] = [];

  @Output() onHideDialogClicked = new EventEmitter();

  @Input() transactions: any;

  handleDialogClosed = () => {
    this.onHideDialogClicked.emit();
  };

  dropdownSelectedCategory: any;

  dropdownSelectedSubCategory: any;

  categoriesOptions: any[] = [];

  subCategoriesOptions: any[] = [];

  handleCategorySelectedChange = (event: any) => {
    const { value } = event;
    this.subCategoriesOptions = this.categoryService.getSubCategory(value);
    this.dropdownSelectedSubCategory = null;
  };

  handleCancel = (event: any) => {
    console.log('kacel ');
    this.onHideDialogClicked.emit();
  };

  handleApply = (event: any) => {
    let catcode = this.dropdownSelectedSubCategory
      ? this.dropdownSelectedSubCategory
      : this.dropdownSelectedCategory;

    //validation

    if (this.isForMultypleTransactions) {
      this.transactionsIdArray.forEach((x) => {
        this.apiService
          .categorizeTransaction(x.id, catcode)
          .subscribe((data) => {
            this.transactions.filter((t: any) => t.id == x.id)[0].catcode =
              catcode;
          });
      });

      return this.handleDialogClosed();
    }

    this.apiService
      .categorizeTransaction(this.transactionId, catcode)
      .subscribe((data) => {
        this.transactions.filter(
          (x: any) => x.id == this.transactionId
        )[0].catcode = catcode;
      });

    this.handleDialogClosed();
  };

  ngOnInit(): void {
    this.categoriesOptions = this.categoryService.extractCategories();

    if (!this.isForMultypleTransactions && this.transaction.catcode) {
      let { selectedCategory, selectedSubCategory } =
        this.getSelectedCategoryDataFromTransaction(this.transaction);
      this.dropdownSelectedCategory = selectedCategory;
      this.dropdownSelectedSubCategory = selectedSubCategory;
      this.subCategoriesOptions = this.subCategoriesOptions =
        this.categoryService.getSubCategory(selectedCategory);
      console.log('load already selected...', this.subCategoriesOptions);
    }
  }

  getSelectedCategoryDataFromTransaction = (transaction: any) => {
    let { catcode } = transaction;
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
    };
  };
}
