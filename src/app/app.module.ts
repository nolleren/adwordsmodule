import { AdwordAdExampleComponent } from './content/ad-content/adword-ad-example/adword-ad-example.component';
import { ListItemComponent } from './list/ad-list/list-item/list-item.component';
import { ProductService } from './products/product.service';
import { CampaignService } from './campaign/campaign.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule, MatCardModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { HttpModule } from '@angular/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreateCampaignComponent } from './campaign/create-campaign/create-campaign.component';
import { ChooseCampaignComponent } from './campaign/choose-campaign/choose-campaign.component';
import { CampaignNotCreatedDialogComponent } from './dialogs/campaign-not-created-dialog/campaign-not-created-dialog.component';
import { CampaignCreatedDialogComponent } from './dialogs/campaign-created-dialog/campaign-created-dialog.component';
import { DatepickerComponent } from './campaign/create-campaign/date-picker/date-picker.component';
import { CampaignSelectedDialogComponent } from './dialogs/campaign-selected-dialog/campaign-selected-dialog.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsSelectedDialogComponent } from './dialogs/products-selected-dialog/products-selected-dialog.component';
import { AdContentComponent } from './content/ad-content/ad-content.component';
import { ListService } from './list/list.service';
import { AdListComponent } from './list/ad-list/ad-list.component';
import { AdContentService } from './content/ad-content.service';
import { AdwordsAdsCreatedDialogComponent } from './dialogs/adwords-ads-created-dialog/adwords-ads-created-dialog.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    CampaignComponent,
    CreateCampaignComponent,
    ChooseCampaignComponent,
    DatepickerComponent,
    CampaignNotCreatedDialogComponent,
    CampaignCreatedDialogComponent,
    CampaignSelectedDialogComponent,
    CampaignSelectedDialogComponent,
    ProductListComponent,
    ProductsSelectedDialogComponent,
    ProductsSelectedDialogComponent,
    AdContentComponent,
    AdListComponent,
    ListItemComponent,
    AdwordsAdsCreatedDialogComponent,
    AdwordAdExampleComponent
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
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  entryComponents: [
    CampaignNotCreatedDialogComponent,
    CampaignCreatedDialogComponent,
    CampaignSelectedDialogComponent,
    ProductsSelectedDialogComponent,
    AdwordsAdsCreatedDialogComponent
  ],
  providers: [ 
    CampaignService, 
    ProductService,
    ListService,
    AdContentService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
