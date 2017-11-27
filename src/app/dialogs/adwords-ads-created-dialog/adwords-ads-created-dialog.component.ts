import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-adwords-ads-created-dialog',
  templateUrl: './adwords-ads-created-dialog.component.html',
  styleUrls: ['./adwords-ads-created-dialog.component.css']
})
export class AdwordsAdsCreatedDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
