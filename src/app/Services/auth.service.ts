import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(candidates:any){
    if (candidates.Email == "Maysara Nasser" && candidates.Password == "Iam_tester_22"){
      localStorage.setItem('user' , candidates.Email);
      return true;
    }
    return false;
    // this.http.post('AUTHENTCATION_API_LINK_HERE',candidates)
    // .pipe(map(response => {
    //   let result = JSON.parse(response.toString());
    //   if(result && result.token){
    //     localStorage.setItem('token',result.token);
    //     return true;
    //   }
    //   return false;
    // }));

  }
}
