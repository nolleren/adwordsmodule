import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {
  
  constructor(private http: Http) { }

  // Observable string source
  DataProductListSource = new Subject<Product[]>();

  // Observable string stream
  DataProductList$ = this.DataProductListSource.asObservable();

  // Service message commands
  setChosenProducts(products: Product[]){
    this.DataProductListSource.next(products);
  }
  

  getProducts(){
    //return this.http.get("http://adwordsmoduleapi.azurewebsites.net/api/products").map(res => res.json());
    return this.http.get("http://localhost:52185/api/products").map(res => res.json());
  }
}
