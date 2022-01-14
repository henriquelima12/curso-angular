import { TestBed } from '@angular/core/testing';

import { Curso2Service } from './curso2.service';

describe('Curso2Service', () => {
  let service: Curso2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Curso2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
