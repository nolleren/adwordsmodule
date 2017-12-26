import { ModelSetter } from './../../../models/modelSetter';
import { AdGroup } from './../../../models/adGroup';
import { AdContent } from './../../../models/adContent';
import { KeyValuePair } from './../../../models/keyValuePair';
import { Product } from './../../../models/product';
import { AdwordsContent } from './../../../models/adwordsContent';
import { CampaignService } from './../../campaign/campaign.service';
import { CampaignListItem } from './../../../models/campaignListItem';
import { ListService } from './../list.service';
import { AdContentService } from './../../content/ad-content.service';
import { ListItemComponent } from './list-item/list-item.component';
import { Component, OnInit } from '@angular/core';
import { AdWordsAd } from '../../../models/AdWordsAd';
import { ProductService } from '../../products/product.service';
import { AdGroupService } from '../../ad/ad-group-service.service';
import { MatDialog } from '@angular/material';
import { Dialog } from '../../../models/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { ChangedAdCOntent } from '../../../models/changedAdContent';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css']
})
export class AdListComponent implements OnInit {
  adwordsAds: AdWordsAd[];
  replaceAdwordsAds: AdWordsAd[];
  visible: boolean;
  enableAdList: boolean;
  adGroup: AdGroup;
  adwordsContent: AdwordsContent;
  toggleCreateAdsButton: boolean;
  productList: Product[];
  adContent: AdContent;
  url: string = "http://www.nolleren.org";
  modelSetter: ModelSetter;
  replaceAdContent: boolean[];

  constructor(private adContentService: AdContentService, 
              private listService: ListService, 
              private campaignService: CampaignService,
              private productService: ProductService,
              private adGroupService: AdGroupService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.adwordsAds = [];
    this.visible = false;
    this.enableAdList = false;
    this.adGroup = new AdGroup();
    this.toggleCreateAdsButton = false;
    this.productList = [];
    this.adContent = new AdContent();
    this.modelSetter = new ModelSetter();
    this.replaceAdContent = [];

    this.addProductToList();
    this.removeProductFromList();
    this.getAdContent();
    this.getSelectedAdGroup();
    this.reset();
  }

  reset(){
    this.listService.resetProcess.subscribe(data => {
      this.adContent = new AdContent();
      this.adwordsAds = [];
      this.adGroup = new AdGroup();
      this.productList = [];
      this.enableAdList = false;
      this.visible = false;
    });
  }

  getSelectedAdGroup(){
    this.adGroupService.setSelectedAdGrop.subscribe((data: AdGroup) => {
      this.adGroup = data;
    })
  }

  getAdContent(){
    this.adContentService.adContent.subscribe((data: ChangedAdCOntent) => {
      this.adContent = data.adContent;
      this.replaceAdContent = data.replaceAdContent;
      if(this.adwordsAds.length === 0){
        for(let i = 0; i < this.productList.length; i++) {
          let adWordsAd: AdWordsAd = this.createAdWordContent(this.productList[i]);
          this.adwordsAds.push(adWordsAd);
        };
      }
      else {
        this.replaceAdwordsAds = [];
        for(let i = 0; i < this.productList.length; i++) {
          let adWordsAd: AdWordsAd = this.createAdWordContent(this.productList[i]);
          this.replaceAdwordsAds.push(adWordsAd);
        };
        for(let i = 0; i < this.adwordsAds.length; i++){
          this.updateAdwordsAd(this.adwordsAds[i], this.replaceAdwordsAds[i]);
        }
      }
      if(this.adwordsAds.length !== 0) this.enableAdList = true;
    });
  }

  updateAdwordsAd(adWordsAd: AdWordsAd, replaceAdwordsAds: AdWordsAd){
    if(this.replaceAdContent[0]) adWordsAd.adContent.headLinePart1 = replaceAdwordsAds.adContent.headLinePart1;
    if(this.replaceAdContent[1]) adWordsAd.adContent.headLinePart2 = replaceAdwordsAds.adContent.headLinePart2;
    if(this.replaceAdContent[2]) adWordsAd.adContent.path1 = replaceAdwordsAds.adContent.path1;
    if(this.replaceAdContent[3]) adWordsAd.adContent.path2 = replaceAdwordsAds.adContent.path2;
    if(this.replaceAdContent[4]) adWordsAd.adContent.description = replaceAdwordsAds.adContent.description;
  }

  addProductToList(){
    this.productService.addProductToList.subscribe((data: Product) => {
      this.productList.push(data);
      let isMyObjectEmpty = Object.keys(this.adContent).length;
      if(this.adwordsAds.length !== 0 || isMyObjectEmpty) {
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
    let adwordAd = this.modelSetter.setAdwordAd(product, this.adContent);
    this.modelSetter.replacer(adwordAd, product, false);
    return adwordAd;
  }

  show(){
    this.visible = !this.visible;
  }
  
  validateAds(){
    let valid: boolean = false;
    for(let element of this.adwordsAds){
      if(element.adContent.description.length > 80) return false;
      if(element.adContent.path1 !== undefined)
        if(element.adContent.path1.length > 15) return false;
      if(element.adContent.path2 !== undefined)
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
      let dialog: Dialog = {
        headline: "Annoncerne blev oprettet",
        message: "Start forfra hvis de ønsker at oprette flere annoncer"
      };
      this.dialog.open(DialogComponent, { data: dialog });
      this.toggle();
      this.show();
      this.listService.resetProcess.next();
    },
      err => {
        let dialog: Dialog = {
          headline: "Annoncerne blev ikke oprettet",
          message: "Opstod en fejl under oprettelse af annoncerne, prøv venligst igen eller kontakt support"
        };
        this.dialog.open(DialogComponent, { data: dialog });
      });
  }

  toggle(){
    this.toggleCreateAdsButton = !this.toggleCreateAdsButton
  }
} 
