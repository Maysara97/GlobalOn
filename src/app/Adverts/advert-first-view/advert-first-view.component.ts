import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advert-first-view',
  templateUrl: './advert-first-view.component.html',
  styleUrls: ['./advert-first-view.component.scss']
})
export class AdvertFirstViewComponent implements OnInit {

  advertTitle:any;
  constructor() {
    this.advertTitle = localStorage.getItem('advertTitle');
    localStorage.removeItem("advertTitle");
   }

  ngOnInit(): void {
  }

}
