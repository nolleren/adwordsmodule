import { CampaignService } from './../../campaign/campaign.service';
import { ProductService } from './../product.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material';
import { ProductsSelectedDialogComponent } from '../../dialogs/products-selected-dialog/products-selected-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = [];
  visible: boolean = false;

  constructor(private productService: ProductService, private dialog: MatDialog) {}

  ngOnInit() {
    this.setProductList();
  }

  setProductList(){
    this.productService.getProducts().subscribe(data => {
      data.forEach(element => {
        let product: Product = {
          id: element.id,
          productNumber: element.productNumber,
          productName: element.productName,
          logicName: element.logicName,
          description: element.description,
          extraDescription: element.extraDescription
        };
        this.products.push(product);
      });      
    });
  }

  updateSelectedProducts(product: Product, event){
    if(event.checked === true) this.selectedProducts.push(product);
      else this.selectedProducts.splice(this.selectedProducts.indexOf(product), 1);
  }

  setChosenProducts(){
    this.productService.setChosenProducts(this.selectedProducts);
    this.show();
    this.dialog.open(ProductsSelectedDialogComponent, { data: { products: this.selectedProducts }} )
  }

  show(){
    this.visible = !this.visible;
  }

}
