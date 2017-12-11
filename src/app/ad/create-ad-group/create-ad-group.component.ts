import { CampaignService } from './../../campaign/campaign.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdGroup } from '../../../models/adGroup';
import { AdGroupService } from '../ad-group-service.service';
import { CampaignListItem } from '../../../models/campaign';
import { Dialog } from '../../../models/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { MatDialog } from '@angular/material';

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
  toggleCreateAdGroupButton: boolean;

  constructor(private adGroupService: AdGroupService,
              private campaignService: CampaignService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.adGroup = new AdGroup();
    this.toggleCreateAdGroupButton = false;
    this.adGroups = this.adGroupService.getAdGroups(this.campaign);
  
    this.createFormGroup();
  }

  createFormGroup(){
    this.adGroupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)]),
      'keyWords': new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  toggle(){
    this.toggleCreateAdGroupButton = !this.toggleCreateAdGroupButton;
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
    this.toggle();
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
      this.toggle();
      this.toggleCreateAdGroup();
      let dialog: Dialog = {
        headline: "Annoncegruppen blev oprettet",
        message: "Annoncegruppen kan nu vælges fra listen"
      };
      this.dialog.open(DialogComponent, { data: dialog });
    },
    err => {
      let dialog: Dialog = {
        headline: "Annoncegruppen blev ikke oprettet",
        message: "Opstod en fejl under oprettelse af annoncegruppen, prøv venligst igen eller kontakt support"
      };
      this.dialog.open(DialogComponent, { data: dialog });
    });
  }  
}