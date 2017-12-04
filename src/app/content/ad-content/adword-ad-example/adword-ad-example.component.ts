import { Product } from './../../../../models/product';
import { AdWordsAd } from './../../../../models/AdWordsAd';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { AdContent } from '../../../../models/adContent';
import { ProductService } from '../../../products/product.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-adword-ad-example',
  templateUrl: './adword-ad-example.component.html',
  styleUrls: ['./adword-ad-example.component.css']
})
export class AdwordAdExampleComponent implements OnInit, OnChanges {
  @Input() adContent: AdContent;
  adExample: AdWordsAd;
  product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.adExample = new AdWordsAd();
    this.product = new Product();
    this.setProductList();
  }

  ngOnChanges(changes: SimpleChanges) {
     this.adContent = changes.adContent.currentValue;
     //console.log(this.adContent);
  }

  setProductList(){
    this.productService.getProducts().subscribe((data) => {
      //console.log(data[0].productLos[0].id);
          this.product = {
            id: data[0].productLos[0].id,
            productNumber: data[0].productLos[0].productNumber,
            productName: data[0].productLos[0].productName,
            logicName: data[0].productLos[0].logicName,
            description: data[0].productLos[0].description,
            descriptionShort: data[0].productLos[0].descriptionShort,
            adGroupId: data[0].productLos[0].adGroupLoId
        };
      });
      
    }
}
