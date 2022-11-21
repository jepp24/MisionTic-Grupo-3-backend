import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraCarritoComponent } from './compra-carrito.component';

describe('CompraCarritoComponent', () => {
  let component: CompraCarritoComponent;
  let fixture: ComponentFixture<CompraCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
