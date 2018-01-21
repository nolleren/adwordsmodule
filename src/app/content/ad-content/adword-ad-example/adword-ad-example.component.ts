import { ModelSetter } from './../../../../models/modelSetter';
import { element } from 'protractor';
import { Product } from './../../../../models/product';
import { AdWordsAd } from './../../../../models/AdWordsAd';
import { Component, OnInit } from '@angular/core';
import { AdContent } from '../../../../models/adContent';
import { ProductService } from '../../../products/product.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { AdContentService } from '../../ad-content.service';
import { ListService } from '../../../list/list.service';

@Component({
  selector: 'app-adword-ad-example',
  templateUrl: './adword-ad-example.component.html',
  styleUrls: ['./adword-ad-example.component.css']
})
export class AdwordAdExampleComponent implements OnInit {
  product: Product;
  modelSetter: ModelSetter;
  adwordAd: AdWordsAd;
  url: string = "http://www.nolleren.org/";

  constructor(private productService: ProductService,
              private adContentService: AdContentService,
              private listService: ListService) { }

  ngOnInit() {
    this.product = new Product();
    this.modelSetter = new ModelSetter();
    this.adwordAd = new AdWordsAd();
    this.getProduct();
    this.setAdContent();
    this.reset();
  }

  reset(){
    this.listService.resetProcess.subscribe(data => {
      this.adwordAd = new AdWordsAd();
    });
  }

  setAdContent(){
    this.adContentService.setAdContent.subscribe((data: AdContent) => {
      this.createAdWordContent(this.product, data);
    });
  }

  setShowExample(){
    let isMyObjectEmpty = Object.keys(this.adwordAd).length;
    if(isMyObjectEmpty) return true;
      else return false; 
  }

  getProduct(){
    this.productService.getProducts().subscribe((data) => {
          this.product = this.modelSetter.setProduct(data);
        }); 
    }

    createAdWordContent(product: Product, adContent: AdContent) {
      this.adwordAd = this.modelSetter.setAdwordAd(product, adContent);
      this.modelSetter.replacer(this.adwordAd, product, true);
      
    }

}
