import { AppPage } from './../../../../e2e/app.po';
import { MatDialog } from '@angular/material';
import { AdwordsAdsCreatedDialogComponent } from './../../dialogs/adwords-ads-created-dialog/adwords-ads-created-dialog.component';
import { AdContentService } from './../ad-content.service';
import { element } from 'protractor';
import { AdWordsAd } from './../../../models/AdWordsAd';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { AdContent } from '../../../models/adContent';
import { DragNdrop } from '../../../models/dragNdrop';
import { ProductService } from '../../products/product.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { KeyValuePair } from '../../../models/keyValuePair';
declare var $ :any;

@Component({
  selector: 'app-ad-content',
  templateUrl: './ad-content.component.html',
  styleUrls: ['./ad-content.component.css']
})
export class AdContentComponent implements OnInit {
  visible: boolean;
  adContent: AdContent;
  draggable: DragNdrop;
  adContentForm: FormGroup;
  url: string = "www.nolleren.org/";  
  replacers: string[] = [ "Produktnummer", "Produktnavn", "Logisknavn", "Beskrivelse" ];

  constructor(private adContentService: AdContentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.visible = false;
    this.adContent = new AdContent();
    this.draggable = new DragNdrop();

    this.draggable.draggable();
    this.createFormGroup();
    this.setDataBinding();
  }

  alertChildComponentOnChanges(){
    this.adContent = {
      description: this.adContent.description,
      headLinePart1: this.adContent.headLinePart1,
      headLinePart2: this.adContent.headLinePart2,
      path1: this.adContent.path1,
      path2: this.adContent.path2
    }  
  }

  setDataBinding(){
    $("#headlinePart1").on("keyup dropped", () => {
      let value = $("#headlinePart1").val();
      this.adContent.headLinePart1 = value;    
      this.adContentForm.patchValue({headlinePart1: value});
      $("#headlinePart1").focus();  
      this.alertChildComponentOnChanges();
    });
    $("#headlinePart2").on("keyup dropped", () => {
      let value = $("#headlinePart2").val();
      this.adContent.headLinePart2 = value; 
      this.adContentForm.patchValue({headlinePart2: value});
      $("#headlinePart2").focus(); 
      this.alertChildComponentOnChanges();
    });
    $("#path1").on("keyup dropped", () => {
      let value = $("#path1").val();
      this.adContent.path1 = value;
      this.adContentForm.patchValue({path1: value});
      $("#path1").focus();
      this.alertChildComponentOnChanges();
    });
    $("#path2").on("keyup dropped", () => {
      let value = $("#path2").val();
      this.adContent.path2 = value;
      this.adContentForm.patchValue({path2: value});
      $("#path2").focus();
      this.alertChildComponentOnChanges();
    });
    $("#description").on("keyup dropped", () => {
      let value = $("#description").val();
      this.adContent.description = value;   
      this.adContentForm.patchValue({description: value});
      $("#description").focus();
      this.alertChildComponentOnChanges();
    });
  }

  createFormGroup(){
    this.adContentForm = new FormGroup({
      'headlinePart1': new FormControl(null, Validators.required),
      'headlinePart2': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

  setAdwordsAds(){
    this.createContentProduct(true);
  }

  submitAdContent(){
    this.setAdwordsAds();
  }

  createContentProduct(showDialog: boolean){
    this.adContentService.adContent.next(this.adContent);
    if(showDialog) this.dialog.open(AdwordsAdsCreatedDialogComponent);
    this.visible = false;
  }

  show(){
    this.visible = !this.visible;
  }

}
