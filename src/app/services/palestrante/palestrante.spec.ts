import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { PalestranteService } from './palestrante';

describe('PalestranteService', () => {
  let service: PalestranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(PalestranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});