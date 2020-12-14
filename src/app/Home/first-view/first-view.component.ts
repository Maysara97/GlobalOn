import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrls: ['./first-view.component.scss']
})
export class FirstViewComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToPost(){
    this.router.navigate(["/post-advert"]);
  }

}
