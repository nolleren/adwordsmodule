import { Product } from './../../../../models/product';
import { AdWordsAd } from './../../../../models/AdWordsAd';
import { Component, OnInit } from '@angular/core';
import { AdContent } from '../../../../models/adContent';
import { ProductService } from '../../../products/product.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { AdContentService } from '../../ad-content.service';

@Component({
  selector: 'app-adword-ad-example',
  templateUrl: './adword-ad-example.component.html',
  styleUrls: ['./adword-ad-example.component.css']
})
export class AdwordAdExampleComponent implements OnInit {
  replacedAdContent: AdContent;
  product: Product;
  url: string = "http://www.nolleren.org/";

  constructor(private productService: ProductService,
              private adContentService: AdContentService) { }

  ngOnInit() {
    this.replacedAdContent = new AdContent();
    this.product = new Product();
    this.getProduct();
    this.setAdContent();
  }

  setAdContent(){
    this.adContentService.setAdContent.subscribe((data: AdContent) => {
      this.replacedAdContent = data;
      this.replacer(this.replacedAdContent, this.product);
    });
  }

  getProduct(){
    this.productService.getProducts().subscribe((data) => {
          this.product = {
            id: data[0].productLos[0].id,
            productNumber: data[0].productLos[0].productNumber,
            productName: data[0].productLos[0].productName,
            logicName: data[0].productLos[0].logicName,
            description: data[0].productLos[0].description,
            descriptionShort: data[0].productLos[0].descriptionShort,
            adGroupId: data[0].productLos[0].adGroupLoId,
            isChecked: false,
            keyValuePairs: []
        };
        for(let i = 0; i < data[0].productLos[0].keyValuePairs.length; i++){
          this.product.keyValuePairs.push({
            key: data[0].productLos[0].keyValuePairs[i].key,
            value: data[0].productLos[0].keyValuePairs[i].value
          });
        }
      });    
    }

    createAdWordContent(product: Product) : AdWordsAd{
      let adwordAd: AdWordsAd = {
        adContent: {
          headLinePart1: this.replacedAdContent.headLinePart1,
          headLinePart2: this.replacedAdContent.headLinePart2,
          path1: this.replacedAdContent.path1,
          path2: this.replacedAdContent.path2,
          description: this.replacedAdContent.description
        },
        id: product.id,
        finalUrl: [this.url + "/" + product.logicName]
      };
      this.replacer(this.replacedAdContent, product);
      return adwordAd;
    }

    replacer(contentProduct: AdContent, product: Product){
      if(contentProduct.headLinePart1 !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.headLinePart1 = contentProduct.headLinePart1.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
        }
      }
      if(contentProduct.headLinePart2 !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.headLinePart2 = contentProduct.headLinePart2.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
        }
      }
      if(contentProduct.path1 !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.path1 = contentProduct.path1.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);         
        }
      }
      if(contentProduct.path2 !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.path2 = contentProduct.path2.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
        }
      } 
      if(contentProduct.description !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.description = contentProduct.description.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
        }
      }  
      if(contentProduct.headLinePart1 !== undefined) contentProduct.headLinePart1 = contentProduct.headLinePart1.substring(0, 30);
      if(contentProduct.headLinePart2 !== undefined) contentProduct.headLinePart2 = contentProduct.headLinePart2.substring(0, 30);
      if(contentProduct.path1 !== undefined) contentProduct.path1 = contentProduct.path1.substring(0, 15); 
      if(contentProduct.path2 !== undefined) contentProduct.path2 = contentProduct.path2.substring(0, 15); 
      if(contentProduct.description !== undefined) contentProduct.description = contentProduct.description.substring(0, 80);  
  }
}
