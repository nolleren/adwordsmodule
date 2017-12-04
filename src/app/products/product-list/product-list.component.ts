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
  products: Product[] = [];
  selectedProducts: Product[] = [];
  visible: boolean = false;
  counter: number;
  productGroups: ProductGroup[];

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {


    this.productGroups = [];
    this.counter = 0;
    this.setProductList();
  }

  setProductList(){
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
      for(let i = 0; i < data.length; i++)
      {
        let productGroup: ProductGroup = {
          id: data[i].id,
          name: data[i].groupName,
          products: []
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
          });
        }
        this.productGroups.push(productGroup);
      }
     console.log(this.productGroups);
    });
  }

  updateSelectedProducts(product: Product, event){
    if(event.checked === true) {
      this.counter++;
      this.productService.addProductToList.next(product);
    }
    else {
      this.counter--;
      this.productService.removeProductFromList.next(product);
    }
  }

  setChosenProducts(){
    this.show();
    this.dialog.open(ProductsSelectedDialogComponent, { data: { products: this.selectedProducts }} );
  }

  show(){
    this.visible = !this.visible;
  }

  noProductChosen(){
    if(this.counter <= 0) return false;
      return true;
  }

}
