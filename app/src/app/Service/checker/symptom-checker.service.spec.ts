import { TestBed } from '@angular/core/testing';

import { SymptomCheckerService } from './symptom-checker.service';

describe('SymptomCheckerService', () => {
  let service: SymptomCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymptomCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
