import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McuComponent } from './mcu.component';

describe('McuComponent', () => {
  let component: McuComponent;
  let fixture: ComponentFixture<McuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(McuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
