import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Injectable, isDevMode } from '@angular/core';
import { Product } from '../../models/product';
import { ContentProduct } from '../../models/contentProduct';

@Injectable()
export class ProductService {
  httpString: string;

  constructor(private http: Http) {
    if(isDevMode()) this.httpString = "http://localhost:52185/api/products";
    else this.httpString = "http://adwordsmoduleapi.azurewebsites.net/api/products"; 
  }

  setChosenproduct = new Subject<Product[]>();
  changeInProductList = new Subject
  
  getProducts(){
    return this.http.get(this.httpString).map(res => res.json());
  }
}
