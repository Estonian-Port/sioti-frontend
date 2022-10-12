import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnOffComponent } from './on-off.component';

describe('OnOffComponent', () => {
  let component: OnOffComponent;
  let fixture: ComponentFixture<OnOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
