import { Http } from '@angular/http';
import { AdwordsContent } from './../../models/adwordsContent';
import { Injectable, isDevMode } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AdWordsAd } from '../../models/AdWordsAd';

@Injectable()
export class ListService {
  resetProcess = new Subject();
  httpString: string;

  constructor(private http: Http) {
    if(isDevMode()) this.httpString = "http://localhost:52185/api/ads";
    else this.httpString = "https://adwordsmoduleapi.azurewebsites.net/api/ads"; 
   }

   createAds(adwordsContent: AdwordsContent){
      return this.http.post(this.httpString, adwordsContent).map(res => res.json());
   }

}
