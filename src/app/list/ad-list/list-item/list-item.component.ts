import { Test } from './../../../../models/test';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { TagContentType } from '@angular/compiler';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements OnInit {
  listItemForm: FormGroup;
  
  @Input() test: Test;

  constructor() { }

  ngOnInit() {
    this.createFormGroup();
    
    console.log(this.test);
  }

  createFormGroup(){
    this.listItemForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }

  submitCampaign(){}

}
