import { Router } from '@angular/router';
import { AdvertService } from './../../Services/advert.service';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"


@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {


  commonAdverts!:any[];
  noData = false;
  lastPage!:Number;
  pageSize = 4;
  pageIndex = 0;
  startIndex = 0;
  endIndex = 0;
  allAdverts!:any[][];
  isNext = true;
  isPrev = false;
  constructor(private adService : AdvertService , private router:Router) { }

  

  ngOnInit(): void {
    // this.AdvertsSlider();
    this.getPopluarAdverts();
  }
  async getPopluarAdverts(){
     (await this.adService.getCommonAdverts(1)).subscribe(async (response:any)=>{
      this.allAdverts = response.Data.Result
      this.lastPage = Number(response.Data.LastPage);
      for(let i = 2 ; i<=this.lastPage ; i++){
        (await this.adService.getCommonAdverts(i)).subscribe((response:any)=>{
          this.allAdverts = this.allAdverts.concat(response.Data.Result);
        });

      }
      
      this.commonAdverts = this.allAdverts.slice(0,4);
      if(this.allAdverts.length == 0){
        this.noData = true;
      }
      else{
        this.noData = false;
      }
  
    })
   
  }

  editDate(advertDate:string){
    var date = advertDate.split('T');
    var myDate = date[0];
    return myDate;
  }

  showAdvertDetails(advert:any){
    localStorage.setItem('advertId' , advert.Id);
    localStorage.setItem('advertTitle' , advert.Title);
    this.router.navigate(['/advert-details']);
    
  }

  navigateNext(){
    this.isPrev = true;
    this.pageIndex = this.pageIndex + 1;
    
    this.startIndex = this.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;

    if(this.endIndex > this.allAdverts.length){
      this.isNext = false;
      return;
    }
    this.commonAdverts = this.allAdverts.slice(this.startIndex, this.endIndex)
  }
  navigatePrev(){
    this.isNext = true;
    if(this.pageIndex == 0 ){
      return;
    }
    if(this.pageIndex == 1 || this.pageIndex == 0){
      this.isPrev = false;
    }
        this.pageIndex = this.pageIndex - 1;
      
    
    this.startIndex = this.pageIndex * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;

    if(this.startIndex < 0 || this.startIndex == 0){
      this.startIndex = 0;
    }
    this.commonAdverts = this.allAdverts.slice(this.startIndex, this.endIndex)
   }

}
