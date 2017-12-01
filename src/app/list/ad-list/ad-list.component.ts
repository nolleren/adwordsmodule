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
import { Router } from '@angular/router';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  listItemForm: FormGroup;
  adwordsAds: AdWordsAd[];
  visible: boolean;
  enableAdList: boolean;
  campaign: CampaignListItem;
  adwordsContent: AdwordsContent;
  toggleCreateAdsButton: boolean;
  productList: Product[];
  keyValuePair: KeyValuePair[];
  adContent: AdContent;
  replacers: string[] = [ "Produktnummer", "Produktnavn", "Logisknavn", "Beskrivelse" ];
  url: string = "http://www.nolleren.org/";

  constructor(private adContentService: AdContentService, 
              private listService: ListService, 
              private campaignService: CampaignService,
              private productService: ProductService) { }

  ngOnInit() {
    this.adwordsAds = [];
    this.visible = false;
    this.enableAdList = false;
    this.campaign = new CampaignListItem();
    this.toggleCreateAdsButton = false;
    this.productList = [];
    this.keyValuePair = [];
    this.adContent = new AdContent();

    this.setChosenCampaign();
    this.addProductToList();
    this.removeProductFromList();
    this.getAdContent();
  }

  setChosenCampaign(){
    this.campaignService.setChosenCampaign.subscribe((data: CampaignListItem) => {
      this.campaign = data;
    });
  }

  getAdContent(){
    this.adContentService.adContent.subscribe((data) => {
      this.adContent = data;
      if(this.adwordsAds.length === 0){
        for(let i = 0; i < this.productList.length; i++) {
          let adWordsAd: AdWordsAd = this.createAdWordContent(this.productList[i]);
          this.adwordsAds.push(adWordsAd);
        };
      }
      this.enableAdList = true;
    });
  }

  addProductToList(){
    this.productService.addProductToList.subscribe((data) => {
      this.productList.push(data);
      if(this.adwordsAds.length > 0) {
        let adWordAd: AdWordsAd = this.createAdWordContent(data);
        this.adwordsAds.push(adWordAd);
      }
    });
  }

  removeProductFromList(){
    this.productService.removeProductFromList.subscribe((data: Product) => {
      this.productList.splice(this.productList.indexOf(data), 1);

      for(let i = 0; i < this.adwordsAds.length; i++){
        if(this.adwordsAds[i].id === data.id) this.adwordsAds.splice(i, 1);
      }
    });
  }

  createAdWordContent(product: Product) : AdWordsAd{
    let adwordAd: AdWordsAd = {
      adContent: {
        headLinePart1: this.adContent.headLinePart1,
        headLinePart2: this.adContent.headLinePart2,
        path: this.adContent.path,
        description: this.adContent.description
      },
      id: product.id,
      finalUrl: [this.url + "/" + product.logicName]
    };
    this.setKeyValuePairs(product);
    this.replacer(adwordAd);
    return adwordAd;
  }

  show(){
    this.visible = !this.visible;
  }
  
  validateAds(){
    let valid: boolean = false;
    for(let element of this.adwordsAds){
      if(element.adContent.description.length > 80) return false;
      if(element.adContent.path.length > 15) return false;
      if(element.adContent.headLinePart1.length > 30) return false;
      if(element.adContent.headLinePart2.length > 30) return false;
        valid = true;
    }
    if(this.campaign.id === undefined) return false;
    return valid;
  }

  createAds(){
    this.toggle();
    this.adwordsContent = {
      contentCampaign: this.campaign,
      contentProducts: this.adwordsAds
    };
    this.listService.createAds(this.adwordsContent).subscribe((data) => {
      this.toggle();
    },
      err => {

      });
    this.campaignService.removeCampaign.next(this.campaign);
  }

  toggle(){
    this.toggleCreateAdsButton = !this.toggleCreateAdsButton
  }

  setKeyValuePairs(contentProduct: Product){
    this.keyValuePair = [];
    let keyValue1: KeyValuePair = {
      key: this.replacers[0],
      value: contentProduct.productNumber
    };
    this.keyValuePair.push(keyValue1);

    let keyValue2: KeyValuePair = {
      key: this.replacers[1],
      value: contentProduct.productName
    };
    this.keyValuePair.push(keyValue2);

    let keyValue3: KeyValuePair = {
      key: this.replacers[2],
      value: contentProduct.logicName
    };
    this.keyValuePair.push(keyValue3);

    let keyValue4: KeyValuePair = {
      key: this.replacers[3],
      value: contentProduct.description
    };
    this.keyValuePair.push(keyValue4);
  }

  replacer(contentProduct: AdWordsAd){
    for(let i = 0; i < this.keyValuePair.length; i++){
      contentProduct.adContent.headLinePart1 = contentProduct.adContent.headLinePart1.replace(this.keyValuePair[i].key, this.keyValuePair[i].value);
    }
    for(let i = 0; i < this.keyValuePair.length; i++){
      contentProduct.adContent.headLinePart2 = contentProduct.adContent.headLinePart2.replace(this.keyValuePair[i].key, this.keyValuePair[i].value);
    }
    for(let i = 0; i < this.keyValuePair.length; i++){
      contentProduct.adContent.path = contentProduct.adContent.path.replace(this.keyValuePair[i].key, this.keyValuePair[i].value);
    }
    for(let i = 0; i < this.keyValuePair.length; i++){
      contentProduct.adContent.description = contentProduct.adContent.description.replace(this.keyValuePair[i].key, this.keyValuePair[i].value);
    }
  }
    
} 
