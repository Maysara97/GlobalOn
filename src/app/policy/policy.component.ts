import { HttpClient } from '@angular/common/http';
import { Parser } from '@angular/compiler/src/ml_parser/parser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {
  isoCode :any;
  text!:string;
  TermsAndConditions:any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isoCode = "ae"
    this.http.get(`http://mahmoudnuman-001-site1.gtempurl.com/services/api/country/GetByIsoCode?isocode=${this.isoCode}`)
    .subscribe((response:any)=>{
      this.text = response.Data.TermsAndConditions;
      // this.TermsAndConditions = document.createElement('div');
      // this.TermsAndConditions.innerHTML = this.text;
    });
   
   
  }

  // stringToHTML(str:any) {
  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(str, 'text/html');
  //   return doc.body;
  // };

}
