import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecomponentComponent } from './createcomponent.component';

describe('CreatecomponentComponent', () => {
  let component: CreatecomponentComponent;
  let fixture: ComponentFixture<CreatecomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatecomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
