import { TestBed, inject } from '@angular/core/testing';

import { CreaturesService } from './creatures.service';

describe('CreaturesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreaturesService]
    });
  });

  it('should be created', inject([CreaturesService], (service: CreaturesService) => {
    expect(service).toBeTruthy();
  }));
});
