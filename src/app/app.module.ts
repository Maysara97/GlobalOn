import { AdvertService } from './Services/advert.service';
import { RouterModule } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { SignInComponent } from './Account/sign-in/sign-in.component';
import { SignOutComponent } from './Account/sign-out/sign-out.component';
import { SignUpComponent } from './Account/sign-up/sign-up.component';
import { combineLatest } from 'rxjs';
import { HomeMainComponent } from './Home/home-main/home-main.component';
import { HomeHeaderComponent } from './Home/home-header/home-header.component';
import { FirstViewComponent } from './Home/first-view/first-view.component';
import { RecentlyLookedAtComponent } from './Home/recently-looked-at/recently-looked-at.component';
import { PostAdvertComponent } from './Adverts/post-advert/post-advert.component';
import { AddAdvertComponent } from './add-advert/add-advert.component';
import { MyAddsComponent } from './Profile/my-adds/my-adds.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    HomeMainComponent,
    HomeHeaderComponent,
    FirstViewComponent,
    RecentlyLookedAtComponent,
    PostAdvertComponent,
    AddAdvertComponent,
    MyAddsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: "" , component:HomeMainComponent},
        {path:"home-main", component:HomeMainComponent},
        {path: "sign-in" , component:SignInComponent},
        {path: "sign-up" , component: SignUpComponent},
        {path: "post-advert" , component: PostAdvertComponent},
        {path: "add-advert" , component: AddAdvertComponent},
        {path: "my-adds" , component:MyAddsComponent}
      ]
    )
    
  ],
  providers: [AuthService , AdvertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
