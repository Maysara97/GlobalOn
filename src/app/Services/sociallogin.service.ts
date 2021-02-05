import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
url:any;
  constructor(private http:HttpClient) { }

  Savesresponse(responce:any){
    this.url = "Social Login API Link";
    this.http.post(this.url,responce);
  }
}
