import { CategoriesService } from './Services/categories.service';
import { ProfileService } from './Services/profile.service';

import { AdvertService } from './Services/advert.service';
import { RouterModule } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'

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
import { MyAddsComponent } from './Profile/my-adds/my-adds.component';
import {GoogleLoginProvider,FacebookLoginProvider, SocialAuthServiceConfig} from 'angularx-social-login';
import { PolicyComponent } from './policy/policy.component';
import {MostPopularComponent} from './Home/most-popular/most-popular.component';
import { AdvertDetailsComponent } from './Adverts/advert-details/advert-details.component';
import { AdvertFirstViewComponent } from './Adverts/advert-first-view/advert-first-view.component';
import { AddToFavouriteComponent } from './Adverts/add-to-favourite/add-to-favourite.component';
import { MyFavouritesComponent } from './Profile/my-favourites/my-favourites.component';
import { AdvertsOfCategoryComponent } from './Adverts/adverts-of-category/adverts-of-category.component';
import { EditProfileComponent } from './Profile/edit-profile/edit-profile.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { FooterComponent } from './footer/footer.component';
import { PolicyAndTermsComponent } from './policy-and-terms/policy-and-terms.component';




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
    MyAddsComponent,
    PolicyComponent,
    MostPopularComponent,
    AdvertDetailsComponent,
    AdvertFirstViewComponent,
    AddToFavouriteComponent,
    MyFavouritesComponent,
    AdvertsOfCategoryComponent,
    EditProfileComponent,
    ShowImageComponent,
    FooterComponent,
    PolicyAndTermsComponent
  ],
  entryComponents: [PolicyComponent,ShowImageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(
      [
        {path: "" , component:HomeMainComponent},
        {path:"home-main", component:HomeMainComponent},
        {path: "sign-in" , component:SignInComponent},
        {path: "sign-up" , component: SignUpComponent},
        {path: "post-advert" , component: PostAdvertComponent},
        {path: "my-adds" , component:MyAddsComponent},
        {path: "advert-details" , component:AdvertDetailsComponent},
        {path: "my-favourites" , component:MyFavouritesComponent},
        {path: "category-adverts" , component:AdvertsOfCategoryComponent},
        {path: "my-profile" , component:EditProfileComponent},
        {path:"policy-and-terms", component:PolicyAndTermsComponent}
      ]
    )
    
  ],
  providers: [AuthService , AdvertService , ProfileService, CategoriesService,
    {
      provide:'SocialAuthServiceConfig',
      useValue:{
        autoLogin :false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('869980063800208')
          },
          {
            id : GoogleLoginProvider.PROVIDER_ID,
            provider : new GoogleLoginProvider('147362404186-l5ukn534ckicjjfuqll91vso0nd7nbea.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
