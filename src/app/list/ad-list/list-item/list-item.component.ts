import { AdWordsAd } from '../../../../models/AdWordsAd';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { ListService } from '../../list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  listItemForm: FormGroup;
  @Input() adwordAd: AdWordsAd;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.createFormGroup();
  }

  adWordChanged(){
    this.listService.updateAdWordsAd.next(this.adwordAd);
  }

  createFormGroup(){
    this.listItemForm = new FormGroup({
      'headlinePart1': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'headlinePart2': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'path1': new FormControl(null, [Validators.maxLength(15)]),
      'path2': new FormControl(null, [Validators.maxLength(15)]),
      'description': new FormControl(null, [Validators.required, Validators.maxLength(80)])
    });
  }
}
