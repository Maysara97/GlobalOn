import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavouriteComponent } from './add-to-favourite.component';

describe('AddToFavouriteComponent', () => {
  let component: AddToFavouriteComponent;
  let fixture: ComponentFixture<AddToFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToFavouriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
