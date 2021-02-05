import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAndTermsComponent } from './policy-and-terms.component';

describe('PolicyAndTermsComponent', () => {
  let component: PolicyAndTermsComponent;
  let fixture: ComponentFixture<PolicyAndTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyAndTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyAndTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
