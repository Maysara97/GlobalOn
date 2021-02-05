import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http : HttpClient) { }

  getFavAdverts(userId:any,page:any){
    return this.http.get(`http://mahmoudnuman-001-site1.gtempurl.com/api/FavoriteAdverts?UserId=${userId}&Page=${page}`);

  }

  getMyAdverts(userId:any , page:any , pageSize:any){
    var headers = new HttpHeaders();
     headers.append('UserId',userId)
    return this.http.get(`http://mahmoudnuman-001-site1.gtempurl.com/api/Advert/GetByUserId?page=${page}&pageSize=${pageSize}`,{headers :new HttpHeaders ({'UserId' : userId})});
  }

  editProfile(newProfileData: any){
      return this.http.post("http://mahmoudnuman-001-site1.gtempurl.com/api/Account/Edit",newProfileData);
  }

  delete(advertKey:any){
    return this.http.delete(`http://mahmoudnuman-001-site1.gtempurl.com/api/Advert?advertKey=${advertKey}`);

  }
}
