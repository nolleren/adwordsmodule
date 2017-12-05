import { AdContent } from './../../models/adContent';
import { Injectable } from '@angular/core';
import { AdWordsAd } from '../../models/AdWordsAd';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AdContentService {
  adwordAds = new Subject<AdWordsAd[]>();
  adContent = new Subject<AdContent>();
  setAdContent = new Subject<AdContent>();

  constructor() { }

}
