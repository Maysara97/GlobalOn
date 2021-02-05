import { ProfileService } from './../../Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-adds',
  templateUrl: './my-adds.component.html',
  styleUrls: ['./my-adds.component.scss']
})
export class MyAddsComponent implements OnInit {
  user:any;
  userEmail = localStorage.getItem('userEmail');
  allMyAdverts!: any[];
  myAdverts!: any[];
  pageSize = 4;
  pageSizeOptions: number[] = [4 ,6, 8, 15]
  totalCount:any;
  noData = false;
  lastPage!:Number;
  imgSrc: any;
  startIndex:any;
  endIndex:any;
  
  constructor(private router:Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userImageUrl')){
      this.imgSrc = localStorage.getItem('userImageUrl');
    }
    else{
      this.imgSrc = "assets/Images/fa-user.png";
    }
  this.user = localStorage.getItem("user");
  this.profileService.getMyAdverts(localStorage.getItem('userId'),1,15)
  .subscribe((response:any)=>{
    console.log(response.Data.Result)
    this.allMyAdverts = response.Data.Result;
    this.lastPage = Number(response.Data.LastPage);
    
    this.myAdverts = this.allMyAdverts.slice(0,4);

    if (this.allMyAdverts.length == 0){
      this.noData = true;
      return;
    }

    if (this.lastPage > 1){
      for(var i = 2; i <= this.lastPage; i++){
        this.profileService.getMyAdverts(localStorage.getItem('userId'),i,15)
        .subscribe((response:any)=>{
          this.allMyAdverts = this.allMyAdverts.concat(response.Data.Result);
          this.totalCount = this.allMyAdverts.length;
        })
      }
    }
    
    this.totalCount = this.allMyAdverts.length;
    if(this.allMyAdverts.length == 0){
      this.noData = true;
    }
    else{
      this.noData = false;
    }
  })

  } 

  editDate(date:string){
    let newDate = date.split('T');
    return newDate[0];
  }

  handleOnPageChange(event:any){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.allMyAdverts.length){
      this.endIndex = this.allMyAdverts.length
    }
    this.myAdverts = this.allMyAdverts.slice(this.startIndex,this.endIndex);
  }
  showAdvertDetails(advert:any){
    localStorage.setItem('advertId' , advert.AdvertId);
    localStorage.setItem('advertTitle' , advert.Title);
    this.router.navigate(['/advert-details']);
    
  } 

  deleteAdvert(advert:any){
     this.profileService.delete(advert.AdvertKey).subscribe((response:any)=>{
    var advertIndex;
    var advertIndexNow
    for(var i = 0 ; i < this.allMyAdverts.length ; i++){
      if(advert.AdvertKey! == this.allMyAdverts[i].AdvertKey!){
         advertIndex = i;
      }
    }
      this.allMyAdverts.splice(Number(advertIndex),1);
      for(var j = 0 ; j < this.myAdverts.length ; j++){
        if(advert.AdvertKey! == this.myAdverts[j].AdvertKey!){
           advertIndexNow = j;
        }
      } 
      this.myAdverts.splice(Number(advertIndexNow),1);
      if(this.allMyAdverts.length == 0){
        this.noData = true;
      }
     });
  }
  Logout(){
    this.user = 'undefind'
    localStorage.clear();
    this.router.navigate(["/home-main"])
  } 

}
