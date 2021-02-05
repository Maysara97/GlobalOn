import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertFirstViewComponent } from './advert-first-view.component';

describe('AdvertFirstViewComponent', () => {
  let component: AdvertFirstViewComponent;
  let fixture: ComponentFixture<AdvertFirstViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertFirstViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertFirstViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
