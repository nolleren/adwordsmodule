import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ContentProduct } from '../../models/contentProduct';

@Injectable()
export class ListService {
  updateAd = new Subject<ContentProduct>();

  constructor() { }

}
