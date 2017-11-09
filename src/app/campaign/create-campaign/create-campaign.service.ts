import { Campaign } from '../../../models/campaign';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class CreateCampaignService {

  constructor(private http: Http) { }

  createCampaign(campaign: Campaign){
    return this.http.post("https://adwordsmoduleapi.azurewebsites.net/api/campaign", campaign).map(res => res.json());
  }

}
