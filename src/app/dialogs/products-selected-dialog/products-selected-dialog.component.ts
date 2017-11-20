import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-products-selected-dialog',
  templateUrl: './products-selected-dialog.component.html'
})
export class ProductsSelectedDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
  }

}
