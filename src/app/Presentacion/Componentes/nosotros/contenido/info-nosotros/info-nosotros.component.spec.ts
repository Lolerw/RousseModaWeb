import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoNosotrosComponent } from './info-nosotros.component';

describe('InfoNosotrosComponent', () => {
  let component: InfoNosotrosComponent;
  let fixture: ComponentFixture<InfoNosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoNosotrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoNosotrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
