import { BlueComponent } from './blue/blue.component';
import { RedComponent } from './red/red.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreateCampaignComponent } from './campaign/create-campaign/create-campaign.component';

const appRoutes: Routes = [
  { path: 'blue', component: BlueComponent },
  { path: 'red', component: RedComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BlueComponent,
    RedComponent,
    TestComponent,
    CampaignComponent,
    CreateCampaignComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
