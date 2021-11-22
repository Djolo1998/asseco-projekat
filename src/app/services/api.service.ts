import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private url = environment.APIEndpoints[environment.type];

  public getCategories() {
    return this.http.get(this.url + 'categories');
  }

  public getTransactions(paramObj: any = null) {
    let params = this.getParamsString(paramObj);
    return this.http.get(this.url + 'transactions' + params);
  }
  public categorizeTransaction(id: string, catcode: any) {
    return this.http.post(
      this.url + `transaction/${id}/categorize`,
      {
        catcode: catcode.toString(),
      },
      {
        responseType: 'text',
      }
    );
  }

  public splitTransaction(id: string, body: any) {
    return this.http.post(this.url + `transaction/${id}/split`, body, {
      responseType: 'text',
    });
  }

  public getSpendingAnalytics(
    paramObj: any = null,
    showSubCategory: boolean = false
  ) {
    let params = this.getParamsString(paramObj);
    let exampleType = 'top-level';
    if (showSubCategory) {
      exampleType = 'sub-category';
    }

    let headers = new HttpHeaders({
      Prefer: `example=${exampleType}`,
    });

    return this.http.get(this.url + `spending-analytics` + params, {
      headers,
    });
  }

  getParamsString = (paramObj: any = null) => {
    let params = new HttpParams({ fromObject: paramObj });

    if (params.toString().length) return '?' + params.toString();
    return '';
  };
}
