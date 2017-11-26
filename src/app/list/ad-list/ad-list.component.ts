import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Test } from '../../../models/test';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdListComponent implements OnInit {
  test: Test[] = [];
  listItemForm: FormGroup;

  constructor() { }

  ngOnInit() {
    let objekt: Test = {
      name: "Stefan"
    }
    let objekt2: Test = {
      name: "Susanne"
    }
    this.test.push(objekt);
    this.test.push(objekt2);

    this.createFormGroup();
  }

  changeName(test: Test){
    console.log(this.test.indexOf(test));
    let testObjekt: Test = {
      name: "Rettet Navn"
    }
    this.test.splice(this.test.indexOf(test), 1, testObjekt);
  }

  createFormGroup(){
    this.listItemForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(1)])
    });
  }
}
