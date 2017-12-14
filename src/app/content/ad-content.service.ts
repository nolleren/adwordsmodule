import { AdContent } from './../../models/adContent';
import { Injectable } from '@angular/core';
import { AdWordsAd } from '../../models/AdWordsAd';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AdContentService {
  adwordAds;
  adContent;
  setAdContent;

  constructor() { 
    this.adwordAds = new Subject<AdWordsAd[]>();
    this.adContent = new Subject<AdContent>();
    this.setAdContent = new Subject<AdContent>();
  }

}
