import { AdContent } from './../../models/adContent';
import { Injectable } from '@angular/core';
import { AdWordsAd } from '../../models/AdWordsAd';
import { Subject } from 'rxjs/Subject';
import { ChangedAdCOntent } from '../../models/changedAdContent';

@Injectable()
export class AdContentService {
  adwordAds;
  adContent;
  setAdContent;

  constructor() { 
    this.adwordAds = new Subject<AdWordsAd[]>();
    this.adContent = new Subject<ChangedAdCOntent>();
    this.setAdContent = new Subject<AdContent>();
  }

}
