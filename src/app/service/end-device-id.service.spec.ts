import { TestBed } from '@angular/core/testing';

import { EndDeviceIdService } from './end-device-id.service';

describe('EndDeviceIdService', () => {
  let service: EndDeviceIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndDeviceIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
