import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  advertImage:any
  constructor() { }

  ngOnInit(): void {
    this.advertImage = localStorage.getItem('selectedAdvertImage');
    localStorage.removeItem('selectedAdvertImage');
  }

}
