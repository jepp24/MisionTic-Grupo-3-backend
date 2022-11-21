import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefilComponent } from './prefil.component';

describe('PrefilComponent', () => {
  let component: PrefilComponent;
  let fixture: ComponentFixture<PrefilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrefilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
