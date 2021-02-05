import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdvertService } from './../../Services/advert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-post-advert',
  templateUrl: './post-advert.component.html',
  styleUrls: ['./post-advert.component.scss']
})
export class PostAdvertComponent implements OnInit {
  userName = localStorage.getItem('user');
  userPhoneNumber = localStorage.getItem('userPhoneNumber');

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
    'fileSource'        : new FormControl("")
  }); 

  form = new FormGroup({
    'image' : new FormControl(""),
    'Title' : new FormControl(""),
    'UserId' : new FormControl(""),
    'CatgId' : new FormControl(""),
    'Price' : new FormControl(""),
    'Condition' : new FormControl(""),
    'Warranty' : new FormControl(""),
    'Description' : new FormControl(""),
    'cityId' : new FormControl(""),
    'Address' : new FormControl(""),
    'AdvertiseName' : new FormControl(""),
    'PhoneNumber' : new FormControl(""),
    'Links' : new FormControl(""),
  })
  ApiForm = new FormGroup({
    'Title' : new FormControl(""),
    'UserId' : new FormControl(""),
    'CatgId' : new FormControl(""),
    'Price' : new FormControl(""),
    'Condition' : new FormControl(""),
    'Warranty' : new FormControl(""),
    'Description' : new FormControl(""),
    'cityId' : new FormControl(""),
    'Address' : new FormControl(""),
    'AdvertiseName' : new FormControl(""),
    'PhoneNumber' : new FormControl(""),
    'Links' : new FormControl(""),
  })
 
  constructor(private adService : AdvertService , private router:Router , private formBuilder:FormBuilder) {
    this.hasSubCategory = true;
    this.ApiForm = this.formBuilder.group({
      image:[null],Title:[null], UserId :[null],CatgId:[null],Price:[null],Condition:[null],Warranty:[null]
      ,Description:[null],cityId:[],Address:[],AdvertiseName:[null],PhoneNumber:[null],Links:[null]
    })
   }
  imageSrc: any;
  categories!: any[];
  subCategory! :any[]; 
  hasSubCategory : any;
  cities!: any[];
  errorAddingAdd: boolean = false;

  GetInputStatues(input:string){  
    return this.addAdvertForm.get(input); 
  }

  ngOnInit(): void {
    this.fillCategories();
    this.fillCities();
  }
  
  fillCategories(){
    this.adService.getCategories().subscribe((response:any) =>{
      this.categories = response.Data;    
    });
  }
  fillSubCategories(category:any){
      for(var i=0 ; i < this.categories?.length ; i++){
          if (category.value == this.categories[i].Id){
            this.subCategory = this.categories[i].SubCategory;
            this.hasSubCategory = true;
          }
          if(this.subCategory.length == 0){
            this.hasSubCategory = 'disabled';
          }
      }
  }
  fillCities(){
    this.adService.getCities().subscribe((response:any) => {
      this.cities = response.Data;
    })
  }

  onSelectedFile(event:any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const file = (event.target as HTMLInputElement).files![0];
      console.log(file)
      this.ApiForm.patchValue({image : file});
      this.ApiForm.updateValueAndValidity();
      // to appear the chosen image in the form
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string
      };
    }
   

  }

  fillApiFormData(){
    this.ApiForm.patchValue({
      Title: this.addAdvertForm.controls["Title"].value,
      UserId : localStorage.getItem('userId'),
      CatgId : this.addAdvertForm.controls['Category'].value,
      Price : this.addAdvertForm.controls['Price'].value,
      Warranty : this.addAdvertForm.controls['Warranty'].value,
      Condition : this.addAdvertForm.controls['Condition'].value,
      Description : this.addAdvertForm.controls['Description'].value,
      cityId : this.addAdvertForm.controls['Choose Emirate'].value,
      Address : this.addAdvertForm.controls['Adress-in-details'].value,
      AdvertiseName : this.addAdvertForm.controls['Name'].value,
      PhoneNumber : this.addAdvertForm.controls['Phone Number'].value,
      Links : this.addAdvertForm.controls['Video Links'].value,
    })
    this.ApiForm.updateValueAndValidity();
    var formData = new FormData();
    formData.append("image" , this.ApiForm.get('image')?.value)
    formData.append("Title",this.addAdvertForm.controls['Title'].value)
    formData.append("UserId",localStorage.getItem('userId')!)
    formData.append("CatgId",this.addAdvertForm.controls['Category'].value)
    formData.append("Price",this.addAdvertForm.controls['Price'].value)
    formData.append("Warranty",this.addAdvertForm.controls['Warranty'].value)
    formData.append("Condition",this.addAdvertForm.controls['Condition'].value)
    formData.append("Description",this.addAdvertForm.controls['Description'].value)
    formData.append("cityId",this.addAdvertForm.controls['Choose Emirate'].value)
    formData.append("Address",this.addAdvertForm.controls['Adress-in-details'].value)
    formData.append("AdvertiseName",this.addAdvertForm.controls['Name'].value)
    formData.append("PhoneNumber",this.addAdvertForm.controls['Phone Number'].value)
    formData.append("Links",this.addAdvertForm.controls['Video Links'].value)

    return formData;
    
  }

  postAdd(addInfo:any){
    if(this.addAdvertForm.controls['Name'].value == "" ||this.addAdvertForm.controls['Name'].value == " "){
      this.addAdvertForm.controls['Name'].setValue(this.userName);
    }
    if(this.addAdvertForm.controls['Phone Number'].value == "" ||this.addAdvertForm.controls['Phone Number'].value == " "){
      this.addAdvertForm.controls['Phone Number'].setValue(this.userPhoneNumber);
    }
    this.errorAddingAdd = false;
    if(this.addAdvertForm.status == "VALID"){
      var ApiForm = this.fillApiFormData();

     
     this.adService.adPost(ApiForm);
     
    }
    else{
      this.errorAddingAdd = true;
    }
  }



}
