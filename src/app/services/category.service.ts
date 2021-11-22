import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {
    this.getCategories();
  }

  // private categoriesArray2 = new BehaviorSubject<any[]>([]);
  // public categoriesArray2$ = this.categoriesArray2.asObservable();

  public categoriesArray: any[] = [];

  getCategories = () => {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categoriesArray = data.items.map(this.mapCategories);

      // this.categoriesArray2.next(data.items);

      console.log('Loaded categories', data.items);
    });
    return this.categoriesArray;
  };

  isSubCategory = (catcode: string) =>
    !!this.getCategoryData(catcode)['parent-code'];

  extractCategories = () =>
    this.categoriesArray.filter((x) => x['parent-code'] == null);

  getSubCategory = (parentCode: string) => {
    return this.categoriesArray.filter((x) => x['parent-code'] == parentCode);
  };

  getCategoryData = (code: string) => {
    return this.categoriesArray.filter((x) => x['code'] == code)[0];
  };

  mapCategories = (x: any) => {
    if (x['parent-code'] == '') {
      x['parent-code'] = null;
    }
    x['code'] = x['code'].toString();
    return x;
  };
}
