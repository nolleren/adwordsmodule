import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AdContent } from '../../../../models/adContent';

@Component({
  selector: 'app-adword-ad-example',
  templateUrl: './adword-ad-example.component.html',
  styleUrls: ['./adword-ad-example.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdwordAdExampleComponent implements OnInit {
  @Input() adContent: AdContent;

  constructor() { }

  ngOnInit() {
  }

}
