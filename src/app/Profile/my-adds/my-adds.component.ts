import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-adds',
  templateUrl: './my-adds.component.html',
  styleUrls: ['./my-adds.component.scss']
})
export class MyAddsComponent implements OnInit {
  user:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  this.user = localStorage.getItem("user");
  }

  Logout(){
    this.user = 'undefind'
    localStorage.clear();
    this.router.navigate(["/home-main"])
  }

}
