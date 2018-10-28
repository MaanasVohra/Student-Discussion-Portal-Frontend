import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Comment } from './comment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // get all comments for a particular answer
  getComments(answerNumber: number): Observable<Comment[]> {
    const url = 'http://localhost:3000/api/comments?answerNumber=' + answerNumber;
    return this.http.get<Comment[]>(url)
      .pipe(
        catchError(this.handleError('get comments for a particular answer', []))
      );
  }

  // creation of new comment
  addComment(inputComment: any): Observable<number> {
    return this.http.post<number>('http://localhost:3000/api/comments', inputComment, httpOptions)
      .pipe(
        catchError(this.handleError('adding new comment', -1))
      );
  }

  deleteComment(commentNumber: number): Observable<number> {
    const url = 'http://localhost:3000/api/comments/' + commentNumber;
    return this.http.delete<number>(url, httpOptions)
      .pipe(
        catchError(this.handleError('error while deleting comment', -1))
      );
  }

  editComment(commentContent: string, commentNumber: number): Observable<number> {
    const url = `http://localhost:3000/api/comments/${commentNumber}`;
    const message = { commentContent: commentContent };
    return this.http.put<number>(url, message, httpOptions)
      .pipe(
        catchError(this.handleError('error while editing comment', -1))
      );
  }

}
