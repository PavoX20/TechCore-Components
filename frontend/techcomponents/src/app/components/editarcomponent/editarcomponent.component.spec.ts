import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcomponentComponent } from './editarcomponent.component';

describe('EditarcomponentComponent', () => {
  let component: EditarcomponentComponent;
  let fixture: ComponentFixture<EditarcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
