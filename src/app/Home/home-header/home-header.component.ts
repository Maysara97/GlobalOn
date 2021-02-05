import { CategoriesService } from './../../Services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
user: any;
imgSrc:any
categoriesArray: any;
  constructor(private router:Router, private categories: CategoriesService) {
    this.user = localStorage.getItem('user'); //should get the token
   }

  ngOnInit(): void {
    if(localStorage.getItem('userImageUrl')){
      this.imgSrc = localStorage.getItem('userImageUrl');
    }
    else{
      this.imgSrc = "assets/Images/fa-user.png";
    }
    this.getMainCategories();
  }

  goToSignIn(){
    this.router.navigate(["/sign-in"]);
  }

  goToSignUp(){
    this.router.navigate(["/sign-up"]);
  }
  goToAdverts(){
    this.router.navigate(["/post-advert"]);
  }
  Logout(){
    this.user = null;
    localStorage.clear();
    this.router.navigate(["/home-main"])
  }

  getMainCategories(){
    this.categories.GetMainCategories()
    .subscribe((response:any)=> {
      this.categoriesArray = response.Data;
    });
  }

  goToCategory(category:any){
    localStorage.setItem('categoryName', category.Name);
    localStorage.setItem('categoryId', category.Id);
    this.router.navigateByUrl('/', {skipLocationChange: true})
  .then(()=>this.router.navigate(['/category-adverts']));
    
  }
  

}
 