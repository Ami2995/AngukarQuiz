import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodComponentComponent } from './food-component.component';

describe('FoodComponentComponent', () => {
  let component: FoodComponentComponent;
  let fixture: ComponentFixture<FoodComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
