import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Injectable, isDevMode } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {
  httpString: string;

  constructor(private http: Http) {}

  // Observable string source
  setChosenproduct = new Subject<Product[]>();
  
  getProducts(){
    return this.http.get("http://adwordsmoduleapi.azurewebsites.net/api/products").map(res => res.json());
  }
}
