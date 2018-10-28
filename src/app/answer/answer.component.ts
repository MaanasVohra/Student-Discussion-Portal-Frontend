import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Answer } from '../answer';
import { CommentService } from '../comment.service';
import { AnswerService } from '../answer.service'; 
import { Comment } from '../comment';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() currentAnswer: Answer;

  @Output() refreshAnswersRequest: EventEmitter<boolean>;

  commentsDisplayed: boolean;
  comments: Comment[];
  editorDisplayed: boolean;
  answerEditorDisplayed: boolean;
  
  editableAnswer: Answer;

  constructor(
    private commentService: CommentService,
    private answerService: AnswerService
  ) {
    this.commentsDisplayed = false;
    this.refreshAnswersRequest = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.getComments();
    this.editorDisplayed = false;
    this.answerEditorDisplayed = false;
    this.editableAnswer = new Answer(this.currentAnswer.answerCreator, this.currentAnswer.answerContent, this.currentAnswer.answerNumber);
  }

  getComments() {
    this.commentService.getComments(this.currentAnswer.answerNumber)
    .subscribe((comments) => { this.comments = comments; });
  }

  displayEditor() {
    this.editorDisplayed = true;
  }

  hideEditor() {
    this.editorDisplayed = false;
  }

  displayComments() {
    this.commentsDisplayed = true;
  }

  hideComments() {
    this.commentsDisplayed = false;
  }

  refreshComments() {
    this.getComments();
  }

  refreshAnswers() {
    this.refreshAnswersRequest.emit(true);
  }

  deleteAnswer() {
    let observable = this.answerService.deleteAnswer(this.currentAnswer.answerNumber);
    let observer = {
      next: (response) => {
        if(response === 1) {
          this.refreshAnswers();
        } else { alert("some error!"); }
      },
      error: (error) => { alert("Even more error!"); },
      complete: () => {}
    }

    observable.subscribe(observer);
  }

  displayAnswerEditorForm() {
    this.answerEditorDisplayed = true;
  }

  hideAnswerEditorForm() {
    this.editableAnswer.answerContent = this.currentAnswer.answerContent;
    this.answerEditorDisplayed = false;
  }

  // this is used to edit the answer
  onSubmit() {
    let observable = this.answerService.editAnswer(this.editableAnswer.answerContent, this.editableAnswer.answerNumber);
    let observer = {
      next: (response) => {
        if(response === 1) {
          this.refreshAnswers();
        } else { alert("Error"); }
      },
      error: (error) => { alert("more error!"); },
      complete: () => { }
    }

    observable.subscribe(observer);
  }

}
