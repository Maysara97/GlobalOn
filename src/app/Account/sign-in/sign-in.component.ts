import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login"
import { SocialUser } from "angularx-social-login";
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [SocialAuthService, SocialUser]
})
export class SignInComponent implements OnInit {
  
  user : any;
   invalidLogin : boolean = false;
   isSuceeded: boolean ;
   errorMessage:any;
    signInForm = new FormGroup({
    'Password'        : new FormControl("",[Validators.required , Validators.minLength(6),Validators.maxLength(50)]),
    'countryCode'     : new FormControl("", Validators.required),
    'phoneNumber'     : new FormControl("" , [Validators.required , Validators.minLength(10),Validators.maxLength(50)]),
    'fullPhoneNumber' : new FormControl("")
   });
   
   ApiForm = new FormGroup({
    'PhoneNumber'        : new FormControl(""),
    'password'     : new FormControl("")
   });

   socialUserForm = new FormGroup({
    'authToken' : new FormControl(""),
    "email" : new FormControl(""),
    "id" : new FormControl(""),
    "name" : new FormControl(""),
    "photoUrl" : new FormControl(""),
    "provider" : new FormControl("")
  })
   
  GetInputStatues(objectName:string){
    return this.signInForm.get(objectName);
  }

  constructor(private auth:AuthService,private router:Router,private authService:SocialAuthService) {
    this.invalidLogin = false;
    this.isSuceeded = false;
   }
   
  signIn(candidates: HTMLInputElement){
    this.invalidLogin = false;
    if(this.signInForm.status == "VALID"){
      this.invalidLogin = false;
      this.signInForm.controls['fullPhoneNumber']
      .setValue(this.signInForm.controls['countryCode'].value + this.signInForm.controls['phoneNumber'].value)
      this.ApiForm.controls['PhoneNumber'].setValue(this.signInForm.controls['fullPhoneNumber'].value);
      this.ApiForm.controls['password'].setValue(this.signInForm.controls['Password'].value);
      
      this.auth.login(this.ApiForm.value).subscribe((response:any)=>{
        console.log(response);
        if(response.Data.AuthenticationToken){
          localStorage.setItem('token', response.Data.AuthenticationToken)
                 localStorage.setItem('user',response.Data.FullName);
                 localStorage.setItem('userEmail',response.Data.Email);
                 localStorage.setItem('userId',response.Data.Id);
                 localStorage.setItem('userPhoneNumber',response.Data.PhoneNumber);
                 localStorage.setItem('userImageUrl',response.Data.ImageUrl);
                  this.router.navigate(['/home-main'])
        }
      },(error:any)=>{
        this.invalidLogin = true;
        this.errorMessage = error.error.Message;
      });
    }
}
  signInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB():void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  Signout(){
    this.authService.signOut();
  }

  ngOnInit(): void {
    localStorage.setItem('footer','no')
    this.authService.authState.subscribe((user) =>{
      this.user = user;
      if (user!=null){
        this.socialUserForm.controls["authToken"].setValue(user.authToken)
        this.socialUserForm.controls["email"].setValue(user.email)
        this.socialUserForm.controls["id"].setValue(user.id)
        this.socialUserForm.controls["name"].setValue(user.name)
        this.socialUserForm.controls["photoUrl"].setValue(user.photoUrl)
        this.socialUserForm.controls["provider"].setValue(user.provider)
        this.auth.socialLogin(this.socialUserForm.value)
      }
    });
  }

}
