import { AdvertService } from './../../Services/advert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertDetailsComponent } from '../advert-details/advert-details.component';

@Component({
  selector: 'app-add-to-favourite',
  templateUrl: './add-to-favourite.component.html',
  styleUrls: ['./add-to-favourite.component.scss']
})
export class AddToFavouriteComponent implements OnInit {

  isFavourite!:boolean;
  isAuthinticated:any;
  favAdvertForm = new FormGroup({
    'UserId'        : new FormControl("",[Validators.required]),
    'AdvertId'     : new FormControl("", Validators.required)
   });
  constructor(private addService:AdvertService , private advertDetails : AdvertDetailsComponent) { 
    this.isFavourite = false;
  } 

  ngOnInit(): void {
    this.addService.getAdvertById(localStorage.getItem('advertId'),localStorage.getItem('userId'))
    .subscribe((response:any)=>{
      this.isFavourite = response.Data.IsFavorite;
    });
    console.log(this.isFavourite);
    if(localStorage.getItem("token")){
      this.isAuthinticated = true;
      this.favAdvertForm.controls['UserId'].setValue(localStorage.getItem("userId"));
      this.favAdvertForm.controls['AdvertId'].setValue(localStorage.getItem("advertId"));
    }
    else{
      this.isAuthinticated = false;
    }
  }
  addToFavourite(){
    if(localStorage.getItem("token")){
      this.addService.Favourite(this.favAdvertForm.value)
      .subscribe((response:any)=>{
        this.isFavourite = true;
      });
  }
  else{
    console.log("Please Login First")
  }
  }
  removeFromFavourite(){
    this.addService.UnFavourite(this.favAdvertForm.value)
    .subscribe((response:any)=> {
      this.isFavourite = false;
    });
  }

}
