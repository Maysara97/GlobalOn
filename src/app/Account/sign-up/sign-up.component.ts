import { PolicyComponent } from './../../policy/policy.component';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  noCountryCode:any;
  errorSummary: any;
  badRequest:any
  errorMessage:any;
  signupForm = new FormGroup(
    { 
    'email'           : new FormControl("",[Validators.email , Validators.maxLength(50) , Validators.required]),
    'fullName'        : new FormControl("",[Validators.minLength(4),Validators.maxLength(50),Validators.required]),
    'countryCode'     : new FormControl("", Validators.required),
    'phoneNumber'     : new FormControl("",[Validators.required,  Validators.minLength(10),Validators.maxLength(50)]),
    'password'        : new FormControl("",[Validators.required , Validators.minLength(6),Validators.maxLength(50)]),
    'confirmPassword' : new FormControl("",   Validators.required),
    'policy'          : new FormControl("" ,  Validators.required),
    'fullPhoneNumber' : new FormControl("")

    });

    ApiForm = new FormGroup(
      {
        'PhoneNumber' : new FormControl(""),
        'password'    : new FormControl(""),
        'RoleId'      : new FormControl (3),
        'FullName'    : new FormControl (""),
        'Email'       : new FormControl ("")
      }
    )

    constructor(private auth:AuthService, private router:Router , private dialog : MatDialog){
      this.noCountryCode = false;
    }
    GetInputStatues(input:string){
    
      return  this.signupForm.get(input); 
    }

  ngOnInit(): void {}
  

checkCountryCode(event:any){
  if(this.GetInputStatues('countryCode')?.touched == true){
       this.noCountryCode = false;
     }
}
  Register(formData : any){
    this.errorSummary = false;
    this.badRequest = false;
   
    if(formData.status == 'INVALID'){
      this.errorSummary = true;
      return;
    }

    if(formData.status == 'VALID'){
      if(this.GetInputStatues('policy')?.value == "" ||this.GetInputStatues('policy')?.value == false){
        return;
      }
        this.signupForm.controls['fullPhoneNumber']
        .setValue(this.GetInputStatues('countryCode')?.value + this.GetInputStatues('phoneNumber')?.value);

        this.ApiForm.controls['PhoneNumber'].setValue(this.GetInputStatues('fullPhoneNumber')?.value);
        this.ApiForm.controls['password'].setValue(this.GetInputStatues('password')?.value);
        this.ApiForm.controls['RoleId'].setValue(3);
        this.ApiForm.controls['FullName'].setValue(this.GetInputStatues('fullName')?.value);
        this.ApiForm.controls['Email'].setValue(this.GetInputStatues('email')?.value);
        this.auth.register(this.ApiForm.value)
        .subscribe((response:any)=>{
          console.log(response);
          if(response.Data.AuthenticationToken){
            localStorage.setItem('token', response.Data.AuthenticationToken)
                   localStorage.setItem('user',response.Data.FullName);
                   localStorage.setItem('userEmail',response.Data.Email);
                   localStorage.setItem('userId',response.Data.Id);
                   localStorage.setItem('userPhoneNumber',response.Data.PhoneNumber);
                   this.router.navigate(['/home-main'])
          }
        }, (error:any)=>{
          this.badRequest = true;
          this.errorMessage = error.error.Message;
        });
        
      }
  }

  showPolicy(){
      this.dialog.open(PolicyComponent);
  }
}
