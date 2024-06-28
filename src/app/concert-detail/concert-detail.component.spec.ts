import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertDetailComponent } from './concert-detail.component';

describe('ConcertDetailComponent', () => {
  let component: ConcertDetailComponent;
  let fixture: ComponentFixture<ConcertDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcertDetailComponent]
    });
    fixture = TestBed.createComponent(ConcertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
