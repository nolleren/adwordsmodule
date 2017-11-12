import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  collapseOne: boolean = false;

  updateTitle(event){
    console.log(event);
  }

  collapse(value: boolean){
    if(value === this.collapseOne) return (this.collapseOne === false) ? this.collapseOne = true : this.collapseOne = false;
  }
}
