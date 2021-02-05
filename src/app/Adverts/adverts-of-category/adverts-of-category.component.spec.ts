import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertsOfCategoryComponent } from './adverts-of-category.component';

describe('AdvertsOfCategoryComponent', () => {
  let component: AdvertsOfCategoryComponent;
  let fixture: ComponentFixture<AdvertsOfCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertsOfCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertsOfCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
