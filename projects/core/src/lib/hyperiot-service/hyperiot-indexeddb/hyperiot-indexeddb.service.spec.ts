import { TestBed } from '@angular/core/testing';

import { HyperiotIndexeddbService } from './hyperiot-indexeddb.service';

describe('HyperiotIndexeddbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HyperiotIndexeddbService = TestBed.get(HyperiotIndexeddbService);
    expect(service).toBeTruthy();
  });
});
