import { ShowImageComponent } from './../../show-image/show-image.component';
import { AdvertService } from './../../Services/advert.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.scss']
})
export class AdvertDetailsComponent implements OnInit {

  userId:any;
  advertId :any;
  advertAdress:any;
  advertTitle:any;
  advertCategory:any;
  advertCity:any;
  advertDescription:any;
  advertLinks:any;
  advertPrice:any;
  advertWarranty:any;
  advertDate!:string;
  advertCondition:any;
  advertPhoneNumber:any;
  advertAdvertiserName:any;
  advertImage :any;
  favourite:any

  constructor(private adService: AdvertService, private dialog : MatDialog) { 
    this.advertId = localStorage.getItem('advertId');
    this.userId = localStorage.getItem('userId');

  }

  ngOnInit(): void {
    this.adService.getAdvertById(this.advertId,this.userId).subscribe((response:any)=> {
      this.favourite = response.Data.IsFavorite;
      this.advertTitle = response.Data.Title;
      this.advertPrice = response.Data.Price;
      this.advertCategory = response.Data.CatgId;
      this.advertCity = response.Data.CityId;
      if(response.Data.Pictures.length == 0){
        this.advertImage = "assets/Images/no-image.jpg";
      }
      else{
        this.advertImage = response.Data.Pictures[0].URL;
      }
      
      var date = response.Data.CreationDate;
       date = date.split('T');
      this.advertDate = date[0];
      this.advertDescription = response.Data.Description;
      this.advertLinks = response.Data.Links;
      this.advertPhoneNumber = response.Data.PhoneNumber;
      this.advertAdress = response.Data.Address;
      this.advertAdvertiserName = response.Data.AdvertiseName;
      if(response.Data.Condition == true){
        this.advertCondition = "New";
      }
      else{
        this.advertCondition = "Used";
      }
      if(response.Data.Warranty == true){
        this.advertWarranty = "Yes"
      }
      else{
        this.advertWarranty = "No"
      }

    })

  }

  showImage(advertImg:any){
    localStorage.setItem('selectedAdvertImage',advertImg);
    this.dialog.open(ShowImageComponent);
  }
}
