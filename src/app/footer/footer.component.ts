import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  noDisplay = false;
  constructor() { }
  
  ngOnInit(): void {
    
    if(localStorage.getItem('footer') == 'no'){
      this.noDisplay = false;
    }
  }

}
