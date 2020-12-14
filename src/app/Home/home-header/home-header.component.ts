import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
user: any;
  constructor(private router:Router) {
    this.user = localStorage.getItem('user'); //should get the token
   }

  ngOnInit(): void {
  }

  goToSignIn(){
    this.router.navigate(["/sign-in"]);
  }

  goToSignUp(){
    this.router.navigate(["/sign-up"]);
  }
  goToAdverts(){
    this.router.navigate(["/post-advert"]);
  }
  Logout(){
    this.user = 'undefind'
    localStorage.clear();
    this.router.navigate(["/home-main"])
  }

}
