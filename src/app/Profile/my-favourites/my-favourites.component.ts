import { ProfileService } from './../../Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent implements OnInit {
  totalCount :any; 
  pageSize = 4;
  pageSizeOptions: number[] = [4 ,8, 12, 15];
  user:any;
  userEmail = localStorage.getItem('userEmail');
  myFavAdds!:any[];
  noData = false;
  lastPage:any;
  startIndex:any; 
  endIndex:any;
  allFavAdverts!:any[];
  pageIndex=0;
  imgSrc: any;
  constructor(private router:Router, private profileService:ProfileService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userImageUrl')){
      this.imgSrc = localStorage.getItem('userImageUrl');
    }
    else{
      this.imgSrc = "assets/Images/fa-user.png";
    }
    this.user = localStorage.getItem("user");
    this.profileService.getFavAdverts(localStorage.getItem('userId'),1)
    .subscribe((response:any)=>{
      this.allFavAdverts = response.Data.Result;
      this.lastPage = Number(response.Data.LastPage);
      this.myFavAdds = this.allFavAdverts.slice(0,4);
      
      if (this.allFavAdverts.length == 0){
        this.noData = true;
        return;
      }
      if(this.lastPage > 1){
        for(var i = 2; i <= this.lastPage; i++){
          this.profileService.getFavAdverts(localStorage.getItem('userId'),i)
          .subscribe((response:any)=>{
            this.allFavAdverts = this.myFavAdds.concat(response.Data.Result);
            this.totalCount = this.allFavAdverts.length;
          })
        }
      }
      this.totalCount = this.allFavAdverts.length;
      if(this.allFavAdverts.length == 0){
        this.noData = true;
      }
      else{
        this.noData = false;
      }
    });
  }

  editDate(date:string){
    let newDate = date.split('T');
    return newDate[0];
  }

  handleOnPageChange(event:any){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.allFavAdverts.length){
      this.endIndex = this.allFavAdverts.length;
    } 
      this.myFavAdds = this.allFavAdverts.slice(this.startIndex,this.endIndex);
  }

  showAdvertDetails(advert:any){
    localStorage.setItem('advertId' , advert.Id);
    localStorage.setItem('advertTitle' , advert.Title);
    this.router.navigate(['/advert-details']);
    
  }

  Logout(){
    this.user = 'undefind'
    localStorage.clear();
    this.router.navigate(["/home-main"])
  }

}
