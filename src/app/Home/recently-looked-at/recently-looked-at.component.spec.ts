import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyLookedAtComponent } from './recently-looked-at.component';

describe('RecentlyLookedAtComponent', () => {
  let component: RecentlyLookedAtComponent;
  let fixture: ComponentFixture<RecentlyLookedAtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyLookedAtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyLookedAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
