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

      this.createContentProduct();
  }

  submitAdContent(){
    this.setAdwordsAds();
  }

  createContentProduct(){
    this.contentProducts = [];
    this.products.forEach(element => {
      let contentProduct: ContentProduct = {
        adContent: {
          headLinePart1: this.replacer(this.adContent.headLinePart1, element),
          headLinePart2: this.replacer(this.adContent.headLinePart2, element),
          path: this.replacer(this.adContent.path, element),
          description: this.replacer(this.adContent.description, element),
        },
        product: {
          id: element.id,
          productNumber: element.productNumber,
          productName: element.productName,
          logicName: element.logicName,
          description: element.description,
          extraDescription: element.extraDescription
        }
      };
      this.contentProducts.push(contentProduct);
    });
    this.adContentService.adwordAds.next(this.contentProducts);
    this.dialog.open(AdwordsAdsCreatedDialogComponent, { data: this.contentProducts.length } )
    this.visible = false;
  }

  replacer(text: string, element: Product) : string{
    for(let i = 0; i < this.replacers.length; i++){
        let count = 0;
        text = text.replace(this.replacers[count++], element.productNumber);
        text = text.replace(this.replacers[count++], element.productName);
        text = text.replace(this.replacers[count++], element.logicName);
        text = text.replace(this.replacers[count], element.description);
    }
    return text;
  }

  show(){
    this.visible = !this.visible;
  }

}
