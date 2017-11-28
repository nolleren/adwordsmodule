import { AdwordsContent } from './../../../models/adwordsContent';
import { CampaignService } from './../../campaign/campaign.service';
import { CampaignListItem } from './../../../models/campaign';
import { ListService } from './../list.service';
import { element } from 'protractor';
import { AdContentService } from './../../content/ad-content.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { Component, OnInit } from '@angular/core';
import { ContentProduct } from '../../../models/contentProduct';
import { Testability } from '@angular/core/src/testability/testability';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  listItemForm: FormGroup;
  adwordsAds: ContentProduct[] = [];
  visible: boolean = false;
  enable: boolean = false;
  campaign: CampaignListItem = new CampaignListItem();
  adwordsContent: AdwordsContent;

  constructor(private adContentService: AdContentService, 
              private listService: ListService, 
              private campaignService: CampaignService,
              private router: Router) { }

  ngOnInit() {
    this.getadwordsAds();
    this.getUpdatedAd();
    this.setChosenCampaign();
  }

  setChosenCampaign(){
    this.campaignService.setChosenCampaign.subscribe((data: CampaignListItem) => {
      this.campaign = data;
    });
  }

  getUpdatedAd(){
    
    this.listService.updateAd.subscribe((data: ContentProduct) => {
      this.adwordsAds.splice(this.adwordsAds.indexOf(data), 1, data);
    });
  }

  addContentProduct

  getadwordsAds(){
    let tempArray: ContentProduct[] = [];
    this.adContentService.adwordAds.subscribe((data: ContentProduct[]) => {
      this.enable = true;
      for(let i = 0; i < data.length; i++){
        let contentProduct: ContentProduct = {
          adContent: {
            headLinePart1: data[i].adContent.headLinePart1,
            headLinePart2: data[i].adContent.headLinePart2,
            path: data[i].adContent.path,
            description: data[i].adContent.description  ,
          },
          product: {
            id: data[i].product.id,
            productNumber: data[i].product.productNumber,
            productName: data[i].product.productName,
            logicName: data[i].product.logicName,
            description: data[i].product.description,
            extraDescription: data[i].product.extraDescription
          },
          finalUrl: data[i].finalUrl
        };
          if(this.addNewProducts(contentProduct)) tempArray.push(contentProduct);
      }
      if(this.adwordsAds.length > data.length) this.adwordsAds = tempArray = this.viTester(data); 
        else this.adwordsAds = tempArray;
      //this.validateAds();
    });
  }

  viTester(testArray: ContentProduct[]){
    let resultArray: ContentProduct[] = [];
    for(let i = 0; i < this.adwordsAds.length; i++){
      for(let j = 0; j < testArray.length; j++){
        if(this.adwordsAds[i].product.id === testArray[j].product.id ){
          resultArray.push(this.adwordsAds[i]);
        }
      }
    }
    return resultArray;
  }

  addNewProducts(contentProduct: ContentProduct){
    for(let i = 0; i < this.adwordsAds.length; i++)
      if(this.adwordsAds[i].product.id === contentProduct.product.id) return false
        return true; 
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
    return valid;
  }

  createAds(){
    this.adwordsContent = {
      contentCampaign: this.campaign,
      contentProducts: this.adwordsAds
    };
    this.listService.createAds(this.adwordsContent).subscribe((data) => {
      console.log(data);
      this.router.navigate["/home"];
    },
      err => {

      });
    this.campaignService.removeCampaign.next(this.campaign);
  }
    
} 
