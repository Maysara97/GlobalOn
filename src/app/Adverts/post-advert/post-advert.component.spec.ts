import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAdvertComponent } from './post-advert.component';

describe('PostAdvertComponent', () => {
  let component: PostAdvertComponent;
  let fixture: ComponentFixture<PostAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
