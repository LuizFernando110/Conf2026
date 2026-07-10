import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Palestrante } from './palestrante';

describe('Palestrante', () => {
  let component: Palestrante;
  let fixture: ComponentFixture<Palestrante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Palestrante],
    }).compileComponents();

    fixture = TestBed.createComponent(Palestrante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
