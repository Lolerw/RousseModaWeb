import { TestBed } from '@angular/core/testing';

import { CatalogoExcService } from '../Catalogo/catalogo-exc.service';

describe('CatalogoExcService', () => {
  let service: CatalogoExcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoExcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
