import { TestBed } from '@angular/core/testing';

import { NutdataService } from './nutdata.service';

describe('NutdataService', () => {
  let service: NutdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
