import { AppPage } from './../../../../e2e/app.po';
import { MatDialog } from '@angular/material';
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
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { Dialog } from '../../../models/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { ListService } from '../../list/list.service';
declare var $ :any;

@Component({
  selector: 'app-ad-content',
  templateUrl: './ad-content.component.html',
  styleUrls: ['./ad-content.component.css']
})
export class AdContentComponent implements OnInit {
  visible: boolean;
  adContent: AdContent;
  outputAdContent: AdContent;
  draggable: DragNdrop;
  adContentForm: FormGroup;
  url: string = "www.nolleren.org/";  
  product: Product;

  constructor(private adContentService: AdContentService, 
              private dialog: MatDialog,
              private productService: ProductService,
              private listService: ListService) { }

  ngOnInit() {
    this.visible = false;
    this.adContent = new AdContent();
    this.draggable = new DragNdrop();
    this.outputAdContent = new AdContent();
    this.product = new Product();

    this.getProduct();
    this.createFormGroup();
    this.setDataBinding();
    this.reset();
  }

  reset(){
    this.listService.resetProcess.subscribe(data => {
      this.adContent = new AdContent();
      this.outputAdContent = new AdContent();
      this.visible = false;
      this.adContentForm.reset();
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
        this.draggable.draggable();
      });    
    }

  alertChildComponentOnChanges(){
    this.outputAdContent = Object.assign({}, this.outputAdContent , this.adContent );
    this.adContentService.setAdContent.next(this.outputAdContent);
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
      'path1': new FormControl(null, Validators.minLength(0)),
      'path2': new FormControl(null, Validators.minLength(0)),
      'description': new FormControl(null, Validators.required)
    });
  }

  setAdwordsAds(){
    this.createContentProduct();
  }

  submitAdContent(){
    this.setAdwordsAds();
  }

  createContentProduct(){
    this.adContentService.adContent.next(this.adContent);
    let dialog: Dialog = {
      headline: "Annonceindhold udfyldt",
      message: "Gå nu videre til 'Tilpas annoncer'"
    };
    this.dialog.open(DialogComponent, { data: dialog });
    this.visible = false;
  }

  show(){
    this.visible = !this.visible;
  }

}
