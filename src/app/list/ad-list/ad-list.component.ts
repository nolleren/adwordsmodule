import { CampaignService } from './../../campaign/campaign.service';
import { CampaignListItem } from './../../../models/campaign';
import { ListService } from './../list.service';
import { element } from 'protractor';
import { AdContentService } from './../../content/ad-content.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { Component, OnInit } from '@angular/core';
import { ContentProduct } from '../../../models/contentProduct';

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

  constructor(private adContentService: AdContentService, 
              private listService: ListService, 
              private campaignService: CampaignService) { }

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

  getadwordsAds(){
    this.adContentService.adwordAds.subscribe((data: ContentProduct[]) => {
      this.enable = true;
      data.forEach(element => {
        let contentProduct: ContentProduct = {
          adContent: {
            headLinePart1: element.adContent.headLinePart1,
            headLinePart2: element.adContent.headLinePart2,
            path: element.adContent.path,
            description: element.adContent.description  ,
          },
          product: {
            id: element.product.id,
            productNumber: element.product.productNumber,
            productName: element.product.productName,
            logicName: element.product.logicName,
            description: element.product.description,
            extraDescription: element.product.extraDescription
          }
        };
        this.adwordsAds.push(contentProduct);
      });
    });
  }

  show(){
    this.visible = !this.visible;
  }
  
  validateAds(){
    let result = this.adwordsAds;
    for(let element of this.adwordsAds){
      if(element.adContent.description.length > 80) return false;
      if(element.adContent.path.length > 15) return false;
      if(element.adContent.headLinePart1.length > 30) return false;
      if(element.adContent.headLinePart2.length > 30) return false;
        return true;
    }
  }

  check(){
    console.log(this.adwordsAds);
  }
    
} 
