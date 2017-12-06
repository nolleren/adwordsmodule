import { AdGroup } from './../../../models/adGroup';
import { AdContent } from './../../../models/adContent';
import { KeyValuePair } from './../../../models/keyValuePair';
import { Product } from './../../../models/product';
import { AdwordsContent } from './../../../models/adwordsContent';
import { CampaignService } from './../../campaign/campaign.service';
import { CampaignListItem } from './../../../models/campaign';
import { ListService } from './../list.service';
import { AdContentService } from './../../content/ad-content.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { Component, OnInit } from '@angular/core';
import { AdWordsAd } from '../../../models/AdWordsAd';
import { ProductService } from '../../products/product.service';
import { AdGroupService } from '../../ad-group/ad-group-service.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  adwordsAds: AdWordsAd[];
  visible: boolean;
  enableAdList: boolean;
  adGroup: AdGroup;
  adwordsContent: AdwordsContent;
  toggleCreateAdsButton: boolean;
  productList: Product[];
  adContent: AdContent;
  url: string = "http://www.nolleren.org";

  constructor(private adContentService: AdContentService, 
              private listService: ListService, 
              private campaignService: CampaignService,
              private productService: ProductService,
              private adGroupService: AdGroupService) { }

  ngOnInit() {
    this.adwordsAds = [];
    this.visible = false;
    this.enableAdList = false;
    this.adGroup = new AdGroup();
    this.toggleCreateAdsButton = false;
    this.productList = [];
    this.adContent = new AdContent();

    this.addProductToList();
    this.removeProductFromList();
    this.getAdContent();
    this.getSelectedAdGroup();
  }

  getSelectedAdGroup(){
    this.adGroupService.setSelectedAdGrop.subscribe((data: AdGroup) => {
      this.adGroup = data;
    })
  }

  getAdContent(){
    this.adContentService.adContent.subscribe((data: AdContent) => {
      this.adContent = data;
      if(this.adwordsAds.length === 0){
        for(let i = 0; i < this.productList.length; i++) {
          let adWordsAd: AdWordsAd = this.createAdWordContent(this.productList[i]);
          this.adwordsAds.push(adWordsAd);
        };
      }
      if(this.adwordsAds.length !== 0) this.enableAdList = true;
    });
  }

  addProductToList(){
    this.productService.addProductToList.subscribe((data: Product) => {
      this.productList.push(data);
      let isMyObjectEmpty = Object.keys(this.adContent).length;
      if(this.adwordsAds.length > 0 || isMyObjectEmpty) {
        let adWordAd: AdWordsAd = this.createAdWordContent(data);
        this.adwordsAds.push(adWordAd);
        this.enableAdList = true;
      }
    });
  }

  removeProductFromList(){
    this.productService.removeProductFromList.subscribe((data: Product) => {
      this.productList.splice(this.productList.indexOf(data), 1);
      for(let i = 0; i < this.adwordsAds.length; i++){
        if(this.adwordsAds[i].productId === data.id) this.adwordsAds.splice(i, 1);
      }
      if(this.adwordsAds.length <= 0) this.enableAdList = false;
    });
  }

  createAdWordContent(product: Product) : AdWordsAd{
    let adwordAd: AdWordsAd = {
      adContent: {
        headLinePart1: this.adContent.headLinePart1,
        headLinePart2: this.adContent.headLinePart2,
        path1: this.adContent.path1,
        path2: this.adContent.path2,
        description: this.adContent.description
      },
      productId: product.id,
      finalUrl: [this.url + product.logicName]
    };
    this.replacer(adwordAd, product);
    return adwordAd;
  }

  show(){
    this.visible = !this.visible;
  }
  
  validateAds(){
    let valid: boolean = false;
    for(let element of this.adwordsAds){
      if(element.adContent.description.length > 80) return false;
      if(element.adContent.path1.length > 15) return false;
      if(element.adContent.path2.length > 15) return false;
      if(element.adContent.headLinePart1.length > 30) return false;
      if(element.adContent.headLinePart2.length > 30) return false;
        valid = true;
    }
    if(this.adGroup.adGroupId === undefined) return false;
    return valid;
  }

  createAds(){
    this.toggle();
    this.adwordsContent = {
      adGroupLo: this.adGroup,
      contentProducts: this.adwordsAds
    };
    this.listService.createAds(this.adwordsContent).subscribe((data) => {
      //sconsole.log(data);
      this.toggle();
    },
      err => {

      });
  }

  toggle(){
    this.toggleCreateAdsButton = !this.toggleCreateAdsButton
  }

  replacer(contentProduct: AdWordsAd, product: Product){
      for(let i = 0; i < product.keyValuePairs.length; i++){
        contentProduct.adContent.headLinePart1 = contentProduct.adContent.headLinePart1.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
      }
      for(let i = 0; i < product.keyValuePairs.length; i++){
        contentProduct.adContent.headLinePart2 = contentProduct.adContent.headLinePart2.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
      }
      if(contentProduct.adContent.path1 !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.adContent.path1 = contentProduct.adContent.path1.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
        }
      }
      if(contentProduct.adContent.path2 !== undefined){
        for(let i = 0; i < product.keyValuePairs.length; i++){
          contentProduct.adContent.path2 = contentProduct.adContent.path2.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
        }
      } 
      for(let i = 0; i < product.keyValuePairs.length; i++){
        contentProduct.adContent.description = contentProduct.adContent.description.replace(product.keyValuePairs[i].key, product.keyValuePairs[i].value);
      }
  }
    
} 
