import { ListService } from './../../list/list.service';
import { CampaignService } from './../../campaign/campaign.service';
import { ProductService } from './../product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material';
import { ProductGroup } from '../../../models/productGroup';
import { Dialog } from '../../../models/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { ModelSetter } from '../../../models/modelSetter';

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
  modelSetter: ModelSetter;

  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private listService: ListService) {}

  ngOnInit() {
    this.products = [];
    this.visible = false;
    this.showProducts = [];
    this.productGroups = [];
    this.counter = 0;
    this.modelSetter = new ModelSetter();
    this.setProductList();
    this.reset();
 }

 reset(){
  this.listService.resetProcess.subscribe(data => {
    this.productGroups = [];
    this.setProductList();
    this.visible = false;
    });
  } 

  addProductGroup(productGroup: ProductGroup, event){
    if(event.target.checked === true) {
      for(let i = 0; i < productGroup.products.length; i++){
        if(productGroup.products[i].isChecked === false){
          this.counter++;
          productGroup.products[i].isChecked = true;
          this.productService.addProductToList.next(productGroup.products[i]);
        }       
      }
    }
    else {
      for(let i = 0; i < productGroup.products.length; i++){
        if(productGroup.products[i].isChecked === true){
        this.counter--;
        productGroup.products[i].isChecked = false;
        this.productService.removeProductFromList.next(productGroup.products[i]);
        }
      }
    }
  }

  addProduct(product: Product, event){
    if(event.target.checked === true) {
      this.counter++;
      product.isChecked = true;
      this.productService.addProductToList.next(product);
    }
    else {
      this.counter--;
      product.isChecked = false;
      this.productService.removeProductFromList.next(product);
    }
  }

  setProductList(){
    this.productService.getProducts().subscribe((data) => {
      for(let i = 0; i < data.length; i++)
      {
        this.productGroups.push(this.modelSetter.setProductGroup(data[i]));
      }  
        this.showProducts.push(false);
    });
  }

  viewProducts(i){
    return this.showProducts[i] = !this.showProducts[i];
  }

  setChosenProducts(){
    this.show();
    let productText = this.counter === 1 ? "produkt" : "produkter";
    let dialog: Dialog = {
      headline: "De ønskede produkter blev valgt",
      message: "Der blev valgt " + this.counter + " " + productText
    };
    this.dialog.open(DialogComponent, { data: dialog });
  }

  show(){ 
    this.visible = !this.visible;
  }

  noProductChosen(){
    if(this.counter <= 0) return false;
      return true;
  }

}
