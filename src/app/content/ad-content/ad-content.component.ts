import { Component, OnInit } from '@angular/core';
import { adContent } from '../../../models/adContent';
import { dragNdrop } from '../../../models/dragNdrop';
declare var $ :any;

@Component({
  selector: 'app-ad-content',
  templateUrl: './ad-content.component.html',
  styleUrls: ['./ad-content.component.css']
})
export class AdContentComponent implements OnInit {
  visible: boolean = false;
  adContent: adContent = new adContent();
  draggable: dragNdrop = new dragNdrop();

  constructor() { }

  ngOnInit() {
    this.draggable.draggable();
  }

  check(){
      this.adContent.headLinePart1 = $("#headlinePart1").val();
      this.adContent.headLinePart2 = $("#headlinePart2").val();
      this.adContent.path = $("#path").val();
      this.adContent.description = $("#description").val();
      console.log(this.adContent);
  }

  show(){
    this.visible = !this.visible;
  }

}
