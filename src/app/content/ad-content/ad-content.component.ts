import { MatDialog } from '@angular/material';
import { AdwordsAdsCreatedDialogComponent } from './../../dialogs/adwords-ads-created-dialog/adwords-ads-created-dialog.component';
import { AdContentService } from './../ad-content.service';
import { element } from 'protractor';
import { ContentProduct } from './../../../models/contentProduct';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { AdContent } from '../../../models/adContent';
import { DragNdrop } from '../../../models/dragNdrop';
import { ProductService } from '../../products/product.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
declare var $ :any;

@Component({
  selector: 'app-ad-content',
  templateUrl: './ad-content.component.html',
  styleUrls: ['./ad-content.component.css']
})
export class AdContentComponent implements OnInit {
  visible: boolean = false;
  products: Product[] = [];
  adContent: AdContent;
  draggable: DragNdrop = new DragNdrop();
  replacers: string[] = [ "Produktnummer", "Produktnavn", "Logisknavn", "Beskrivelse" ];
  contentProducts: ContentProduct[] = [];
  adContentForm: FormGroup;
  url: string = "http://www.nolleren.org/";

  constructor(private productService: ProductService, private adContentService: AdContentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.draggable.draggable();
    this.setChosenProducts();
    this.createFormGroup();

    /*$("#description").on("drop keyup change", () => {
      var $this = $("#description")
      var $test = $this[0];
      console.log($test.value);
    });*/
  }

  createFormGroup(){
    this.adContentForm = new FormGroup({
      'headlinePart1': new FormControl(null, Validators.required),
      'headlinePart2': new FormControl(null, Validators.required),
      'path': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required)
    });
  }

  setChosenProducts(){
    this.productService.setChosenproduct.subscribe((data: Product[]) => {
      if(this.contentProducts.length !== 0) {
        this.products = data;
        this.createContentProduct(false);
      }
        this.products = data;
    });
  }

  setAdwordsAds(){
      this.adContent = {
        headLinePart1: $("#headlinePart1").val(),
        headLinePart2: $("#headlinePart2").val(),
        path: $("#path").val(),
        description: $("#description").val()
      };

      this.createContentProduct(true);
  }

  submitAdContent(){
    this.setAdwordsAds();
  }

  createContentProduct(showDialog: boolean){
    this.contentProducts = [];
    this.products.forEach(element => {
      let contentProduct: ContentProduct = {
        adContent: {
          headLinePart1: this.adContent.headLinePart1,
          headLinePart2: this.adContent.headLinePart2,
          path: this.adContent.path,
          description: this.adContent.description,
        },
        product: {
          id: element.id,
          productNumber: element.productNumber,
          productName: element.productName,
          logicName: element.logicName,
          description: element.description,
          extraDescription: element.extraDescription
        },
        finalUrl: [ this.url + element.logicName ]
      };
      this.replacer(contentProduct);
      this.contentProducts.push(contentProduct);
    });
    this.adContentService.adwordAds.next(this.contentProducts);
    if(showDialog) this.dialog.open(AdwordsAdsCreatedDialogComponent, { data: this.contentProducts.length } )
    this.visible = false;
  }

  replacer(contentProduct: ContentProduct){
    for(let item of this.replacers){
      contentProduct.adContent.headLinePart1 = contentProduct.adContent.headLinePart1.replace(item, contentProduct.product.productName);
      contentProduct.adContent.headLinePart2 = contentProduct.adContent.headLinePart2.replace(item, contentProduct.product.productNumber);
      contentProduct.adContent.path = contentProduct.adContent.path.replace(item, contentProduct.product.logicName);
      contentProduct.adContent.description = contentProduct.adContent.description.replace(item, contentProduct.product.description);
    }
  }

  show(){
    this.visible = !this.visible;
  }

}
