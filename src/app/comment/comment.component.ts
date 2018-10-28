import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('comment') currentComment: Comment;
  @Output() refreshCommentsRequest: EventEmitter<boolean>;

  editableComment: Comment;
  editFormDisplayed: boolean;

  constructor(
    private commentService: CommentService
  ) { 
    this.refreshCommentsRequest = new EventEmitter<boolean>();
    this.editFormDisplayed = false;
  }

  ngOnInit() {
    this.editableComment = new Comment(this.currentComment.commentCreator, this.currentComment.commentContent, this.currentComment.commentNumber);
  }

  displayEditForm() {
    this.editFormDisplayed = true;
  }

  hideEditForm() {
    this.editableComment.commentContent = this.currentComment.commentContent;
    this.editFormDisplayed = false;
  }

  deleteComment() {
    let observable = this.commentService.deleteComment(this.currentComment.commentNumber);
    let observer = {
      next: (response) => {
        if(response === 1) {
          this.refreshComments();
        } else {
          alert("Some error");
        }
      },
      error: (error) => { alert('even more weird error'); },
      complete: () => { }
    }
    observable.subscribe(observer);
  }

  onSubmit() {
    let observable = this.commentService.editComment(this.editableComment.commentContent, this.editableComment.commentNumber);
    let observer = {
      next: (response) => {
        if(response === 1) {
          this.refreshComments();
        } else {
          alert("Some error");
        }
      },
      error: (error) => { alert('even more weird error'); },
      complete: () => { }
    }
    observable.subscribe(observer);
  }

  // goes to answer component
  refreshComments() {
    this.refreshCommentsRequest.emit(true);
  }

}
