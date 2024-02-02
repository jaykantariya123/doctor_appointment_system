import { TestBed } from '@angular/core/testing';

import { ApplyDoctorService } from './apply-doctor.service';

describe('ApplyDoctorService', () => {
  let service: ApplyDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
