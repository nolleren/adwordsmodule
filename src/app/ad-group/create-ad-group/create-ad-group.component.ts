import { CampaignService } from './../../campaign/campaign.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdGroup } from '../../../models/adGroup';
import { AdGroupService } from '../ad-group-service.service';
import { CampaignListItem } from '../../../models/campaign';

@Component({
  selector: 'app-create-ad-group',
  templateUrl: './create-ad-group.component.html',
  styleUrls: ['./create-ad-group.component.css']
})
export class CreateAdGroupComponent implements OnInit {
  adGroupForm: FormGroup;
  adGroup: AdGroup;
  adGroups: AdGroup[];
  @Input() campaign: CampaignListItem;

  constructor(private adGroupService: AdGroupService,
              private campaignService: CampaignService) { }

  ngOnInit() {
    this.adGroup = new AdGroup();
    this.adGroups = this.adGroupService.getAdGroups(this.campaign);
  
    this.createFormGroup();
  }

  createFormGroup(){
    this.adGroupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'keyWords': new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  adGroupNameExist(){
    if(this.adGroups.find(x => x.name === this.adGroup.name)) return false;
    return true;
  }

  submitAdGroup(){
    this.createAdGroup(this.adGroup); 
  }

  toggleCreateAdGroup(){
    this.adGroupService.showCreateAdGroupComponent.next(false);
  }

  createAdGroup(adgroup: AdGroup){
    adgroup.campaignId = this.campaign.id;
    this.adGroupService.createAdGroup(adgroup).subscribe(data => {
      let newAdGroup: AdGroup = {
        adGroupId: data.value[0].id,
        campaignId: data.value[0].campaignId,
        name: data.value[0].name,
        keyWords: ""
      };
      this.adGroupService.addCreatedAdGroupToList.next(newAdGroup);
      this.adGroups.push(newAdGroup);
      this.toggleCreateAdGroup();
    });
  }  
}
