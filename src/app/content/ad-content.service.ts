import { Injectable } from '@angular/core';
import { ContentProduct } from '../../models/contentProduct';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AdContentService {
  adwordAds = new Subject<ContentProduct[]>();

  constructor() { }

}
