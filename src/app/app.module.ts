import { CampaignService } from './campaign/campaign.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreateCampaignComponent } from './campaign/create-campaign/create-campaign.component';
import { ChooseCampaignComponent } from './campaign/choose-campaign/choose-campaign.component';
import { DatepickerComponent } from './campaign/create-campaign/date-picker/date-picker.component';


const appRoutes: Routes = [
 
];

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    CreateCampaignComponent,
    ChooseCampaignComponent,
    DatepickerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [ CampaignService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
