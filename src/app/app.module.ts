import { AdGroupService } from './ad/ad-group-service.service';
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
import { CreateCampaignComponent } from './campaign/create-campaign/create-campaign.component';
import { ChooseCampaignComponent } from './campaign/choose-campaign/choose-campaign.component';
import { DatepickerComponent } from './campaign/create-campaign/date-picker/date-picker.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { AdContentComponent } from './content/ad-content/ad-content.component';
import { ListService } from './list/list.service';
import { AdListComponent } from './list/ad-list/ad-list.component';
import { AdContentService } from './content/ad-content.service';
import { AdGroupComponent } from './ad/ad-group/ad-group.component';
import { CreateAdGroupComponent } from './ad/create-ad-group/create-ad-group.component';
import { DialogComponent } from './dialogs/dialog/dialog.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateCampaignComponent,
    ChooseCampaignComponent,
    DatepickerComponent,
    ProductListComponent,
    AdContentComponent,
    AdListComponent,
    ListItemComponent,
    AdwordAdExampleComponent,
    AdGroupComponent,
    CreateAdGroupComponent,
    DialogComponent
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
    DialogComponent
  ],
  providers: [ 
    CampaignService, 
    ProductService,
    ListService,
    AdContentService,
    AdGroupService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
