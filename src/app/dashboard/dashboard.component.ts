import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topics: any;
  currentSubtopicName: String;

  constructor(
    private topicService: TopicService,
  ) {
    this.topics = [];
  }

  onSelectSubtopic(selectedSubtopicName: String) {
    this.currentSubtopicName = selectedSubtopicName;
  }

  getTopicsAndSubtopics() {
    this.topicService.getAllTopicsAndSubtopics()
      .subscribe((result) => { this.topics = result; });
  }

  ngOnInit() {
    this.getTopicsAndSubtopics();
  }

  // refresh the sidenav when submitted a new topic/subtopic
  refreshDashboardSidenav($event) {
    this.getTopicsAndSubtopics();
  }

}
