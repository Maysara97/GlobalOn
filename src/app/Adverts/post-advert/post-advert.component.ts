import { Router } from '@angular/router';
import { AdvertService } from './../../Services/advert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-advert',
  templateUrl: './post-advert.component.html',
  styleUrls: ['./post-advert.component.scss']
})
export class PostAdvertComponent implements OnInit {

  addAdvertForm = new FormGroup({
    'Category'          : new FormControl("", Validators.required),
    'Sub-Category'      : new FormControl(""),
    'Title'             : new FormControl("",Validators.required),
    'Description'       : new FormControl("",Validators.required),
    'Images'            : new FormControl("",Validators.required),
    'Video Links'       : new FormControl(""),
    'Price'             : new FormControl("",Validators.required),
    'Condition'         : new FormControl("",Validators.required),
    'Warranty'          : new FormControl("",Validators.required),
    'Name'              : new FormControl("",Validators.required),
    'Phone Number'      : new FormControl("",Validators.required),
    'Choose Emirate'    : new FormControl("",Validators.required),
    'Adress-in-details' : new FormControl("",Validators.required),
    'fileSource'        : new FormControl("",Validators.required)
  }); 
  constructor(private adService : AdvertService , private router:Router) { }
  imageSrc: any;
  categories: any;
  GetInputStatues(input:string){
    
    return this.addAdvertForm.get(input);
  }

  ngOnInit(): void {
  }
  
  fillCategories(){
    this.adService.getCategories().subscribe(response =>{
      this.categories = response;
    });
    console.log(this.categories);
  }

  onSelectedFile(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.addAdvertForm.patchValue({
          fileSource : reader.result
        });
      };
    }

  }

  postAdd(addInfo:any){
    // console.log(addInfo);
    this.adService.adPost(addInfo.value);
    this.fillCategories();
    this.router.navigate(["/my-adds"]);
  }



}
