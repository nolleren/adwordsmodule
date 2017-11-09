import { TestBed, inject } from '@angular/core/testing';

import { CreateCampaignService } from './create-campaign.service';

describe('CreateCampaignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCampaignService]
    });
  });

  it('should be created', inject([CreateCampaignService], (service: CreateCampaignService) => {
    expect(service).toBeTruthy();
  }));
});
