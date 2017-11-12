import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCampaignComponent } from './choose-campaign.component';

describe('ChooseCampaignComponent', () => {
  let component: ChooseCampaignComponent;
  let fixture: ComponentFixture<ChooseCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
