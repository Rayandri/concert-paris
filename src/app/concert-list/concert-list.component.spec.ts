import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertListComponent } from './concert-list.component';

describe('ConcertListComponent', () => {
  let component: ConcertListComponent;
  let fixture: ComponentFixture<ConcertListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcertListComponent]
    });
    fixture = TestBed.createComponent(ConcertListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
