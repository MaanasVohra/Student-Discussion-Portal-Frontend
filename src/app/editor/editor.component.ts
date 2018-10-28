import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';

import { Subtopic } from '../subtopic';
import { Topic } from '../topic';
import { Question } from '../question';
import { Answer } from '../answer';
import { Comment } from '../comment';

import { SubtopicService } from '../subtopic.service';
import { TopicService } from '../topic.service';
import { QuestionService } from '../question-service.service';
import { AnswerService } from '../answer.service';
import { CommentService } from '../comment.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() topicEditor: boolean;
  @Input() subtopicEditor: boolean;
  @Input() questionEditor: boolean;
  @Input() answerEditor: boolean;
  @Input() commentEditor: boolean;

  @Input() topicName: String;
  @Input() subtopicName: String;
  @Input() questionNumber: number;
  @Input() answerNumber: number;

  @Output() refreshDashboardSidenavRequest: EventEmitter<Boolean>;
  @Output() refreshQuestionListItemsRequest: EventEmitter<Boolean>;
  @Output() deactivateEditorRequest: EventEmitter<Boolean>;
  @Output() refreshAnswersRequest: EventEmitter<Boolean>;
  @Output() refreshCommentsRequest: EventEmitter<Boolean>;

  currentSubtopic: Subtopic;
  currentTopic: Topic;
  currentQuestion: Question;
  currentAnswer: Answer;
  currentComment: Comment;

  activated: boolean;

  constructor(
    private subtopicService: SubtopicService,
    private topicService: TopicService,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private commentService: CommentService,
    public snackBar: MatSnackBar) {
    this.activated = false;
    this.refreshDashboardSidenavRequest = new EventEmitter<Boolean>();
    this.refreshQuestionListItemsRequest = new EventEmitter<Boolean>();
    this.deactivateEditorRequest = new EventEmitter<Boolean>();
    this.refreshAnswersRequest = new EventEmitter<Boolean>();
    this.refreshCommentsRequest = new EventEmitter<Boolean>();
  }

  ngOnInit() {
    if (this.topicEditor === true) {
      this.currentTopic = new Topic("top123", "maanas");
    } else if (this.subtopicEditor === true) {
      this.currentSubtopic = new Subtopic("sub123", "maanas", this.topicName);
    } else if (this.questionEditor === true) {
      this.currentQuestion = new Question("rollicks", this.subtopicName, "question-heading", "question-subheading", "question-content");
    } else if (this.answerEditor === true) {
      this.currentAnswer = new Answer("rollicks", "add-content", -1);
    } else if (this.commentEditor === true) {
      this.currentComment = new Comment("rollicks", "add-comment", -1);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // making changes to the subtopic name only if the editor is of question type
    if (this.questionEditor === true && !changes.subtopicName.firstChange) {
      this.currentQuestion.subtopicName = changes.subtopicName.currentValue;
    }
  }

  activateEditor() {
    this.activated = true;
  }

  deactivateEditor() {
    if (this.answerEditor === true || this.commentEditor === true) {
      this.deactivateEditorRequest.emit(true);
    } else {
      this.activated = false;
    }
  }

  onSubmit() {
    // for the subtopic editor
    if (this.subtopicEditor === true) {
      // submit a POST request

      let observable = this.subtopicService.addSubtopic(this.currentSubtopic);
      let observer = {
        next: (response) => {
          if (response === 1) {
            this.snackBar.open("New subtopic created!", "Okay!");
            this.refreshDashboardSidenav();
          } else if (response === 0) {
            this.snackBar.open("Duplicate name subtopic", "Okay!");
          } else {
            this.snackBar.open("Some error while creating subtopic", "Okay!");
          }
        },
        error: (error) => {
          alert(error);
        },
        complete: () => {
        }
      }

      // make the subscription
      let subscription = observable.subscribe(observer);
    } else if (this.topicEditor === true) {
      // for the topic editor

      let observable = this.topicService.addTopic(this.currentTopic);
      let observer = {
        next: (response) => {
          if (response === 1) {
            this.snackBar.open("New Topic Created", "Okay!");
            this.refreshDashboardSidenav();
          } else if (response === 0) {
            this.snackBar.open("Duplicate Topic", "Okay!");
          } else {
            this.snackBar.open("Some error while creating new topic");
          }
        },
        error: (error) => {
          alert(error);
        },
        complete: () => {

        }
      }
      observable.subscribe(observer);
    } else if (this.questionEditor) {
      let observable = this.questionService.addQuestion(this.currentQuestion);
      let observer = {
        next: (response) => {
          if (response === 1) {
            this.snackBar.open("New Question Created!", "Okay!");
            this.deactivateEditor();
            this.refreshQuestionListItems();
          } else {
            this.snackBar.open("Some error while creating new question!", "Okay!");
          }
        },
        error: (error) => { alert(error); },
        complete: () => { }
      }

      observable.subscribe(observer);
    } else if(this.answerEditor) {
      const inputAnswer : any = {
        questionNumber: this.questionNumber, 
        answerCreator: this.currentAnswer.answerCreator,
        answerContent: this.currentAnswer.answerContent,
        answerNumber: this.currentAnswer.answerNumber
      }
      let observable = this.answerService.addAnswer(inputAnswer);
      let observer = {
        next: (response) => {
          if(response === 1) {
            this.snackBar.open("New answer created!", "okay!");
            this.deactivateEditor();
            this.refreshAnswers();
          } else {
            this.snackBar.open("Some error while creating new answer!", "okay!");
          }
        },
        error: (error) => { alert(error); },
        complete: () => { }
      }
    
      observable.subscribe(observer);
    } else if(this.commentEditor === true) {

      const inputComment = {
        answerNumber: this.answerNumber,
        commentCreator: this.currentComment.commentCreator,
        commentContent: this.currentComment.commentContent,
        commentNumber: this.currentComment.commentNumber
      }

      let observable = this.commentService.addComment(inputComment);
      let observer = {
        next: (response) => {
          if(response === 1) {
            this.snackBar.open("New comment created!", "Okay!");
            this.deactivateEditor();
            this.refreshComments();
          } else {
            this.snackBar.open("Some error while creating new comment", "Okay!");
          }
        }
      }

      observable.subscribe(observer);
    }
  }

  // goes to dashboard component
  refreshDashboardSidenav() {
    this.refreshDashboardSidenavRequest.emit(true);
  }

  // goes to question-list-item component
  refreshQuestionListItems() {
    this.refreshQuestionListItemsRequest.emit(true);
  }

  // goes to question-detail component
  refreshAnswers() {
    this.refreshAnswersRequest.emit(true);
  }

  // goes to answer component
  refreshComments() {
    this.refreshCommentsRequest.emit(true);
  }

}
