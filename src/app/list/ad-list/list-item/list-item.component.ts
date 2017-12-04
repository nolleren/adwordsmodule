import { AdWordsAd } from './../../../../models/AdWordsAd';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { TagContentType } from '@angular/compiler';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements OnInit {
  listItemForm: FormGroup;
  @Input() adwordAd: AdWordsAd;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup(){
    this.listItemForm = new FormGroup({
      'headlinePart1': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'headlinePart2': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'path1': new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      'description': new FormControl(null, [Validators.required, Validators.maxLength(80)])
    });
  }

  saveChanges(){
    this.listService.updateAd.next(this.adwordAd);
  }

}
