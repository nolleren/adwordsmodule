import { element } from 'protractor';
import { CampaignService } from './../campaign.service';
import { Campaign, CampaignList } from './../../../models/campaign';
import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-choose-campaign',
  templateUrl: './choose-campaign.component.html',
  styleUrls: ['./choose-campaign.component.css']
})
export class ChooseCampaignComponent implements OnInit {
  @Input() campaignList: CampaignList[];
  campaign: Campaign = new Campaign();
  @Output() showCreateCampaign: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() createdCampaign: Campaign;

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  getCampaigns(){
      this.campaignService.getCampaigns().subscribe((result) => {
        result.forEach(element => {
          let campaign: CampaignList = {
            id: element.idField,
            name: element.nameField
          };
        this.campaignList.push(campaign);
      });
    });
  }

  CreateCampaign(){
    this.showCreateCampaign.emit(true);
  }

}
