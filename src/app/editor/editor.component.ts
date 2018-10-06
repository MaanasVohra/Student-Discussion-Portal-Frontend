import { Component, OnInit, Input } from '@angular/core';
import { Subtopic } from '../subtopic';
import { SubtopicService } from '../subtopic.service';  

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Input() topicEditor: boolean;
  currentSubtopic: Subtopic;

  constructor(private subtopicService: SubtopicService) { 
    this.currentSubtopic = new Subtopic("sub123", "maanas", "topic123");
  }

  ngOnInit() {
  }

}
