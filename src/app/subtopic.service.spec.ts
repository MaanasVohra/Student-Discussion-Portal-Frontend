import { TestBed, inject } from '@angular/core/testing';

import { SubtopicService } from './subtopic.service';

describe('SubtopicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubtopicService]
    });
  });

  it('should be created', inject([SubtopicService], (service: SubtopicService) => {
    expect(service).toBeTruthy();
  }));
});
