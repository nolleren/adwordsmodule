import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Injectable, isDevMode } from '@angular/core';
import { Product } from '../../models/product';
import { AdWordsAd } from '../../models/AdWordsAd';

@Injectable()
export class ProductService {
  httpString: string;

  constructor(private http: Http) {
    if(isDevMode()) this.httpString = "http://localhost:52185/api/products";
    else this.httpString = "https://adwordsmoduleapi.azurewebsites.net/api/products"; 
  }

  setChosenproduct = new Subject<Product[]>();
  changeInProductList = new Subject
  addProductToList = new Subject<Product>();
  removeProductFromList = new Subject<Product>();
  
  getProducts(){
    return this.http.get(this.httpString).map(res => res.json());
  }
}
