import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question-service.service';
import { QuestionListItem } from '../question-list-item';

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {

  @Input() subtopicName: String;
  currentDisplayedQuestionListItems: QuestionListItem[];  

  constructor(
    private questionService: QuestionService,
    private router: Router    
  ) { }

  ngOnInit() {
    this.getQuestionListItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getQuestionListItems();
  }

  getQuestionListItems() {
    this.questionService.getQuestionListItems(this.subtopicName)
      .subscribe((result) => { this.currentDisplayedQuestionListItems = result; });
  }

  refreshQuestionListItems($event) {
    this.getQuestionListItems();
  }

  readMore(questionNumber: number) {
    this.router.navigate(['/questions', questionNumber]);
  }

}
