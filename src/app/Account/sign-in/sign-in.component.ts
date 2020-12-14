import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
   invalidLogin : any;
    signInForm = new FormGroup({
    'Email'    : new FormControl("", Validators.required),
    'Password' : new FormControl("",Validators.required)
  }); 
  
  GetInputStatues(objectName:string){
    return this.signInForm.get(objectName);
  }

  constructor(private auth:AuthService,private router:Router) { }
  signIn(candidates: HTMLInputElement){
    var result = this.auth.login(candidates);
    if(result){
      this.router.navigate(["/"]);
    }
    this.invalidLogin = true;

    // this.auth.login(candidates).subscripe(result=>{
    //    if(result){
    //   this.router.navigate(["/"]);
    // }
    // this.invalidLogin = true;
    // });

  }

  ngOnInit(): void {
  }

}
