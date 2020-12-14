import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get("http://mahmoudnuman-001-site1.gtempurl.com/services/api/Category/GetAll");
  }
  
  adPost(adData:any){
   var jsonAdData = JSON.parse(JSON.stringify(adData));
   //this.http.post("API LINK FOR POSTING ADVERT" , jsonAdData);
    // console.log("------------JSON--------------");
    // console.log(jsonAdData);
    // console.log("------------JSON--------------");
  }
}
