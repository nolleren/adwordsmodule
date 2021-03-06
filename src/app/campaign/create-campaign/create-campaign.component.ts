import { CampaignDto } from './../../../models/campaign';
import { CampaignService } from '../campaign.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Dialog } from '../../../models/dialog';
import { DialogComponent } from '../../dialogs/dialog/dialog.component';
import { ModelSetter } from '../../../models/modelSetter';
import { CampaignListItem } from '../../../models/campaignListItem';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
})
export class CreateCampaignComponent implements OnInit {
  campaign: CampaignDto;
  campaignForm: FormGroup;
  campaignList: CampaignListItem[];
  microAmount?: number;
  visible: boolean;
  toggleCreateCampaignButton: boolean;
  modelSetter: ModelSetter;

  constructor(private campaignService: CampaignService, 
              private dialog: MatDialog,){}
  
  ngOnInit(){
    this.campaign = new CampaignDto();
    this.campaign.name = "";
    this.microAmount = null;
    this.visible = false;
    this.toggleCreateCampaignButton = false;
    this.modelSetter = new ModelSetter();

    this.campaignList = this.campaignService.getCampaigns();
    this.createFormGroup();   
    this.setDates();
    this.addCampaignToList();
  }

  createFormGroup(){
    this.campaignForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(55)]),
      'microAmount': new FormControl(null, [ Validators.required, Validators.min(1), Validators.max(10000000) ]),
    });
  }

  formIsValid(){
    let valid: boolean = false;
    if(this.campaign.name.length < 1 || this.campaign.name.length > 55) return false;
    if(this.microAmount < 1 || this.microAmount > 10000000) return false;
    if(this.campaign.startDate === undefined) return false;
    if(this.campaign.endDate === undefined) return false;
    if(!this.campaignNameExist()) return false;
    valid = true;
    return valid;
  }

  addCampaignToList(){
    this.campaignService.addCreatedCampaignToList.subscribe((data: CampaignListItem) => {
      this.campaignList.push(data);
    });
  }

  toggleCreateCampaign(){
    this.campaignService.showCreateCampaignComponent.next(false);
  }

  toggle(){
    this.toggleCreateCampaignButton = !this.toggleCreateCampaignButton;
  }

  setDates(){
    this.campaignService.startDate.subscribe((data: Date) => { this.campaign.startDate = data });
    this.campaignService.endDate.subscribe((data: Date) => { this.campaign.endDate = data });
  }
  
  campaignNameExist(){
    if(this.campaignList.find(x => x.name === this.campaign.name)) return false;
      return true;
  }

  submitCampaign(){
    this.createCampagin(this.campaign);   
  }

  createCampagin(campaign: CampaignDto){
    this.toggle();
    this.campaign.budget.microAmount = this.microAmount;
    this.campaignService.createCampaign(campaign).subscribe(
      data => {        
        this.campaignService.addCreatedCampaignToList.next(this.modelSetter.setCreatedCampaignListItem(data));       
        this.toggleCreateCampaign();
        this.campaign = new CampaignDto();
        let dialog: Dialog = {
          headline: "Kampagnen blev oprettet",
          message: "Kampagnen er nu oprettet, og kan vælges fra listen"
        };
        this.toggle();
        this.dialog.open(DialogComponent, { data: dialog });
    },
      err => {
        this.campaign.budget.microAmount /= 1000000;
        let dialog: Dialog = {
          headline: "Kampagnen blev ikke oprettet",
          message: "Opstod en fejl under oprettelse af kampagnen, prøv venligst igen eller kontakt support"
        };      
        this.toggle();
        this.dialog.open(DialogComponent, { data: dialog });       
    });
  }

  addCreatedCampaignToList(campaign: CampaignListItem){  
    this.campaignService.addCreatedCampaignToList.next(campaign);
  }
}
