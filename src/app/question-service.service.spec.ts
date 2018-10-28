import { TestBed, inject } from '@angular/core/testing';

import { QuestionService } from './question-service.service';

describe('QuestionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionService]
    });
  });

  it('should be created', inject([QuestionService], (service: QuestionService) => {
    expect(service).toBeTruthy();
  }));
});
