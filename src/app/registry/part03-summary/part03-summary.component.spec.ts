import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Part03SummaryComponent } from './part03-summary.component';

describe('Part03SummaryComponent', () => {
  let component: Part03SummaryComponent;
  let fixture: ComponentFixture<Part03SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Part03SummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Part03SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
