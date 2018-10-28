import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question';
import { Answer } from '../answer';

import { QuestionService } from '../question-service.service';
import { AnswerService } from '../answer.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  questionNumber: number;
  questionDetails: Question;
  editorActivated: boolean;
  answers: Answer[];

  constructor(
    private normalRouter: Router,
    private router: ActivatedRoute,
    private location: Location,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {
  }

  ngOnInit() {
    // fetch the questionNumber from the url
    this.router.paramMap.subscribe((params: ParamMap) => {
      const questionNumber = parseInt(params.get('questionNumber'));
      this.questionNumber = questionNumber;

      // fetch question details
      this.getQuestionDetails();

      // fetch answer details
      this.getAnswerDetails();

      // make editor deactivated;
      this.editorActivated = false;
    });
  }

  getAnswerDetails() {
    this.answerService.getAnswers(this.questionNumber).subscribe(
      (answers) => {
        this.answers = answers;
      }
    )
  }

  getQuestionDetails() {
    this.questionService.getQuestionDetails(this.questionNumber).subscribe(
      (questionDetails) => {
        this.questionDetails = questionDetails;
        // alert(JSON.stringify(this.questionDetails));
      }
    );
  }

  refreshAnswers() {
    this.getAnswerDetails();
  }

  activateEditor() {
    this.editorActivated = true;
  }

  deactivateEditor() {
    this.editorActivated = false;
  }

  deleteQuestion() {
    let observable = this.questionService.deleteQuestion(this.questionNumber);
    let observer = {
      next: (response) => {
        alert(response);
        if(response === 1) {
          alert("Question deleted!");
          this.normalRouter.navigate(['/dashboard']);
        } else {
          alert("Some error occurred");
        }
      },
      error: (error) => { alert("Some serious problem occurred"); },
      complete: () => { }
    }

    observable.subscribe(observer);
  }

  goBack() {
    this.location.back();
  }

}
