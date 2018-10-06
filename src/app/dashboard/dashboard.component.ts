import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  topics : any;

  constructor(
    private topicService: TopicService
  ) { this.topics = []; }

  getTopicsAndSubtopics() {
    this.topicService.getAllTopicsAndSubtopics()
    .subscribe((result) => {this.topics = result; });
  }

  ngOnInit() {
    console.log()
    this.getTopicsAndSubtopics();
  }

}
