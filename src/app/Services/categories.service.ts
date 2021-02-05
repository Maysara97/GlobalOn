import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  GetMainCategories(){
    // var headers = new HttpHeaders();
    // headers.append('UserId',userId);
   return this.http.get("http://mahmoudnuman-001-site1.gtempurl.com/api/Category/GetHomePageCategories");
  }

  getcategoryAdverts(catId:any , page:any , pageSize:any, userId:any){
     var headers = new HttpHeaders();
     headers.append('UserId',userId)
     return this.http.get(`http://mahmoudnuman-001-site1.gtempurl.com/api/Advert/GetByCatId?CatId=${catId}&page=${page}&pageSize=${pageSize}`,{headers :new HttpHeaders ({'UserId' : userId})});
  }
}
