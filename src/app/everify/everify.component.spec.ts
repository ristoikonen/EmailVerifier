import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverifyComponent } from './everify.component';

describe('EverifyComponent', () => {
  let component: EverifyComponent;
  let fixture: ComponentFixture<EverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EverifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
