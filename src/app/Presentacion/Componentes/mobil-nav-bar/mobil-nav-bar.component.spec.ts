import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilNavBarComponent } from './mobil-nav-bar.component';

describe('MobilNavBarComponent', () => {
  let component: MobilNavBarComponent;
  let fixture: ComponentFixture<MobilNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
