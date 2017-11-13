import { CampaignList } from './../../models/campaign';
import { Campaign } from '../../models/campaign';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class CampaignService {

  constructor(private http: Http) {
  }
  
  ngOnInit(){}

  createCampaign(campaign: Campaign){
    campaign.budgetDto.microAmount *= 1000000;
    campaign.budgetDto.name = new Date().toString();
    //return this.http.post("http://localhost:52185/api/campaign", campaign).map(res => res.json()); 
    return this.http.post("http://adwordsmoduleapi.azurewebsites.net/api/campaign", campaign).map(res => res.json()); 
  }

  getCampaigns(){
    return this.http.get("http://adwordsmoduleapi.azurewebsites.net/api/campaign").map(res => res.json());                                                           
  }
}
