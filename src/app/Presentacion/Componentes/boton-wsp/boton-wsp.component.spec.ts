import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonWspComponent } from './boton-wsp.component';

describe('BotonWspComponent', () => {
  let component: BotonWspComponent;
  let fixture: ComponentFixture<BotonWspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonWspComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonWspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
