import { KeyValuePair } from './../../../models/keyValuePair';
import { CampaignService } from './../../campaign/campaign.service';
import { ProductService } from './../product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material';
import { ProductsSelectedDialogComponent } from '../../dialogs/products-selected-dialog/products-selected-dialog.component';
import { ProductGroup } from '../../../models/productGroup';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  product: Product;
  visible: boolean;
  showProducts: boolean[];
  counter: number;
  productGroups: ProductGroup[];

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.products = [];
    this.visible = false;
    this.showProducts = [];
    this.productGroups = [];
    this.counter = 0;
    this.setProductList();
 }

  addProductGroup(productGroup: ProductGroup, event){
    if(event.target.checked === true) {
      for(let i = 0; i < productGroup.products.length; i++){
        this.counter++;
        productGroup.products[i].isChecked = true;
        this.productService.addProductToList.next(productGroup.products[i]);
      }
    }
    else {
      for(let i = 0; i < productGroup.products.length; i++){
        this.counter--;
        productGroup.products[i].isChecked = false;
        this.productService.removeProductFromList.next(productGroup.products[i]);
      }
    }
  }

  addProduct(product: Product, event){
    if(event.target.checked === true) {
      this.counter++;
      this.productService.addProductToList.next(product);
    }
    else {
      this.counter--;
      this.productService.removeProductFromList.next(product);
    }
  }

  setProductList(){
    this.productService.getProducts().subscribe((data) => {
      for(let i = 0; i < data.length; i++)
      {
        let productGroup: ProductGroup = {
          id: data[i].id,
          groupName: data[i].groupName,
          products: [],
        };
        for(let j = 0; j < data[i].productLos.length; j++){
          productGroup.products.push({
            id: data[i].productLos[j].id,
            productNumber: data[i].productLos[j].productNumber,
            productName: data[i].productLos[j].productName,
            logicName: data[i].productLos[j].logicName,
            description: data[i].productLos[j].description,
            descriptionShort: data[i].productLos[j].descriptionShort,
            adGroupId: data[i].productLos[j].adGroupLoId,
            isChecked: false,
            keyValuePairs: []
          });

          for(let h = 0; h < data[i].productLos[j].keyValuePairs.length; h++){
            productGroup.products[j].keyValuePairs.push({
              key: data[i].productLos[j].keyValuePairs[h].key,
              value: data[i].productLos[j].keyValuePairs[h].value
            });
          }  
        }  
          this.productGroups.push(productGroup);
      }
          this.showProducts.push(false);
          console.log(this.productGroups);
    });
  }

  viewProducts(i){
    return this.showProducts[i] = !this.showProducts[i];
  }

  setChosenProducts(){
    this.show();
    this.dialog.open(ProductsSelectedDialogComponent, { data: this.counter } );
  }

  show(){
    this.visible = !this.visible;
  }

  noProductChosen(){
    if(this.counter <= 0) return false;
      return true;
  }

}
