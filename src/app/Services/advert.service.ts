import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertService { 

  constructor(private http : HttpClient , private router:Router) { }

  getCategories(){
    return this.http.get("http://mahmoudnuman-001-site1.gtempurl.com/api/Category/GetAll");
  }
  getCities(){
    return this.http.get("http://mahmoudnuman-001-site1.gtempurl.com/api/City/Get")
  }
  
  adPost(adData:any){
   this.http.post("http://mahmoudnuman-001-site1.gtempurl.com/api/Advert/Add" , adData)
   .subscribe((response:any)=>{
     if(response.StatusCode == 200){
       this.router.navigateByUrl('/my-adds')
     }
   });
  }

  async getCommonAdverts(page:any){
    return await this.http.get(`http://mahmoudnuman-001-site1.gtempurl.com/api/Advert/GetCommonAdvetisement?page=${page}&pageSize=15`);
  }

  getAdvertById(advertId:any, userId:any){
    var headers = new HttpHeaders();
    headers.append('UserId',userId);
   return this.http.get(`http://mahmoudnuman-001-site1.gtempurl.com/api/Advert/GetBy?id=${advertId}`,{headers :new HttpHeaders ({'UserId' : userId})});
  }

  Favourite(advertData: any)
  {
   return this.http.post("http://mahmoudnuman-001-site1.gtempurl.com/api/FavoriteAdverts",advertData);

  }
  UnFavourite(advertData:any){
    const httpOptions: any = {
      headers: {
        'Content-Type': 'application/json'
      }
    }; 
    httpOptions.body = {
      UserId: advertData.UserId,
      AdvertId: advertData.AdvertId
    };
    return this.http.delete("http://mahmoudnuman-001-site1.gtempurl.com/api/FavoriteAdverts",httpOptions);
  }
}
