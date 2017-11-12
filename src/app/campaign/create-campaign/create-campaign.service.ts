import { Campaign } from '../../../models/campaign';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class CreateCampaignService {
  campaign: Campaign = new Campaign();
 
  signupForm: FormGroup;
  
  constructor(private http: Http) {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, Validators.required)
      })
    });
  }
  
  ngOnInit(){}

  createCampaign(campaign: Campaign){
    campaign.budgetDto.microAmount *= 1000000;
    campaign.budgetDto.name = new Date().toString();
    return this.http.post("http://localhost:52185/api/campaign", campaign).map(res => res.json()); 
    //return this.http.post("http://adwordsmoduleapi.azurewebsites.net/api/campaign", campaign).map(res => res.json()); 
  }
}
