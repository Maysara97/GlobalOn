import { ProfileService } from './../../Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user:any;
  email = localStorage.getItem('userEmail');
  imgSrc :any;
  userEmail = localStorage.getItem('userEmail');
  message:any;
  messageBox = false;

  editProfileForm = new FormGroup({
    
    'Name' : new FormControl("",Validators.maxLength(50)),
    'Email' : new FormControl("",[Validators.email, Validators.maxLength(50),Validators.minLength(5)]),
    'Image' : new FormControl(""),
    'image' : new FormControl("")
  })
  constructor(private router : Router,private formBuilder:FormBuilder ,
     private profile : ProfileService) {
    this.editProfileForm = this.formBuilder.group({
      Name:[null],Email:[null], Image :[null],image:[null]
    })
   }
 
  ngOnInit(): void {
    if(localStorage.getItem('userImageUrl')){
      this.imgSrc = localStorage.getItem('userImageUrl');
    }
    else{
      this.imgSrc = "assets/Images/fa-user.png";
    }
    this.user = localStorage.getItem("user");
  }

  fillApiFormData(){
    if(this.editProfileForm.controls['Name'].value == null || this.editProfileForm.controls['Name'].value == " "){
      this.editProfileForm.controls['Name'].setValue(localStorage.getItem('user'));
    }
    if(this.editProfileForm.controls['Email'].value == null || this.editProfileForm.controls['Email'].value == " "){
      this.editProfileForm.controls['Email'].setValue(localStorage.getItem('userEmail'));
    }
    var formData = new FormData();
    formData.append("UserId",localStorage.getItem('userId')!)
    formData.append("FullName",this.editProfileForm.controls['Name'].value)
    formData.append("Image" , this.editProfileForm.get('image')?.value)
    formData.append("Email",this.editProfileForm.controls['Email'].value)
    return formData;
  }
  saveChanges(){
    if(this.editProfileForm.controls['Name'].value == null && this.editProfileForm.controls['Email'].value == null && this.editProfileForm.get('image')?.value == null)
    {
      this.message = "No Changes On Profile Data";
      this.messageBox = true;
      return;
    }
    
    var ApiForm = this.fillApiFormData();
    this.profile.editProfile(ApiForm).subscribe((response:any)=>{
      this.imgSrc = response.Data.ImageUrl;
      localStorage.setItem('user' , response.Data.FullName);
      localStorage.setItem('userEmail' , response.Data.Email);
      localStorage.setItem('userId' , response.Data.Id);
      localStorage.setItem('userPhoneNumber' , response.Data.PhoneNumber);
      localStorage.setItem('userImageUrl',response.Data.ImageUrl);
      this.message = "Profile Data Updated Succefully";
      this.messageBox = true;
      // location.reload();
    });

  }

  GetInputStatues(input:string){  
    return this.editProfileForm.get(input); 
  }

  onSelectedFile(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const file = (event.target as HTMLInputElement).files![0];
      this.editProfileForm.patchValue({image : file});
      this.editProfileForm.updateValueAndValidity();
      // to appear the chosen image in the form
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSrc = reader.result as string
      };
    }
   

  }

  Logout(){
    this.user = 'undefind'
    localStorage.clear();
    this.router.navigate(["/home-main"])
  } 
}
