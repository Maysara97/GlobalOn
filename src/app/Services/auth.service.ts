import { logging } from 'protractor';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { catchError, map } from "rxjs/operators"; 
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSucceded:boolean = false;

  constructor(private http : HttpClient,private router:Router) { }

  login(candidates:any){
    return this.http.post("http://mahmoudnuman-001-site1.gtempurl.com/api/Account/Login",candidates)
    .pipe(catchError(this.handleError));   
  }

  register(candidates:any){
    return this.http.post('http://mahmoudnuman-001-site1.gtempurl.com/api/Account/Register',candidates)
    .pipe(catchError(this.handleError));  
  }

  handleError(error:any){
      return throwError(error);
  }

  socialLogin(candidates: any){
    this.http.post("http://mahmoudnuman-001-site1.gtempurl.com/api/Account/RegisterExternal",candidates)
    .subscribe((response:any) =>{
      this.isSucceded = true;
      localStorage.setItem('token' , response.Data.AuthenticationToken);
      localStorage.setItem('user' , response.Data.Name);
      localStorage.setItem('userEmail' , response.Data.Email);
      localStorage.setItem('userId',response.Data.Id);
      this.router.navigate(['/home-main'])
    })
  }
}
