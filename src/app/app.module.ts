import { BlueComponent } from './blue/blue.component';
import { RedComponent } from './red/red.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: 'blue', component: BlueComponent },
  { path: 'red', component: RedComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BlueComponent,
    RedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
