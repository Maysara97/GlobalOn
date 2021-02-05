import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CategoriesService } from './../../Services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adverts-of-category',
  templateUrl: './adverts-of-category.component.html',
  styleUrls: ['./adverts-of-category.component.scss']
})
export class AdvertsOfCategoryComponent implements OnInit {
  totalCount :any; 
  pageSize:any;
  lastPage!:Number;
  pageSizeOptions: number[] = [4 ,6, 8, 15]
  startIndex:any;
  endIndex:any;
  categoryName : any;
  categoryId :any;
  allCategoryAdverts!:any[];
  categoryAdverts!:any[];
  noData=false;
  userEmail = localStorage.getItem('userEmail');
  constructor(private category : CategoriesService , private router : Router) { }

  ngOnInit(): void {
      this.categoryName = localStorage.getItem('categoryName');
      this.categoryId = localStorage.getItem('categoryId');
      localStorage.removeItem('categoryName');
      localStorage.removeItem('categoryId');


      this.category.getcategoryAdverts(this.categoryId,1,15,localStorage.getItem('userId'))
      .subscribe((response:any)=>{
        console.log(response);
        this.allCategoryAdverts = response.Data.Result;
        this.lastPage = Number(response.Data.LastPage);
        this.pageSize = response.Data.PageSize;
        this.categoryAdverts = this.allCategoryAdverts.slice(0,this.pageSize);
        this.totalCount = this.allCategoryAdverts.length;

        if(this.allCategoryAdverts.length == 0){
          this.noData = true;
          return;
        }

        if(this.lastPage > 1){
          for(var i = 2 ; i<=this.lastPage;i++){
            this.category.getcategoryAdverts(this.categoryId,i,15,localStorage.getItem('userId'))
            .subscribe((response:any)=>{
              this.allCategoryAdverts = this.allCategoryAdverts.concat(response.Data.Result);
              this.totalCount = this.allCategoryAdverts.length;
            })
          }
        }
      
        if(this.allCategoryAdverts.length == 0 || response.Data.Result.length == 0){ 
          this.noData = true;
        }
        else{
          this.noData = false;
        }
      });
     
  }

  handleOnPageChange(event:any){
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if(this.endIndex > this.allCategoryAdverts.length){
      this.endIndex = this.allCategoryAdverts.length
    }
    this.categoryAdverts = this.allCategoryAdverts.slice(this.startIndex,this.endIndex);
  }

  showAdvertDetails(advert:any){
    localStorage.setItem('advertId' , advert.AdvertId);
    localStorage.setItem('advertTitle' , advert.Title);
    this.router.navigate(['/advert-details']);
    
  }
  editDate(date:string){
    let newDate = date.split('T');
    return newDate[0];
  }

}
