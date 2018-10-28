import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Answer } from './answer';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // get all answers for a particular question
  getAnswers(questionNumber: number): Observable<Answer[]> {
    const url = 'http://localhost:3000/api/answers?questionNumber=' + questionNumber;
    return this.http.get<Answer[]>(url)
      .pipe(
        catchError(this.handleError('get answer for a particular question', []))
      );
  }

  // create a new answer
  addAnswer(inputAnswer: any): Observable<number> {
    return this.http.post<number>('http://localhost:3000/api/answers', inputAnswer, httpOptions)
      .pipe(
        catchError(this.handleError('adding new answer', -1))
      );
  }

  // delete a particular answer
  deleteAnswer(answerNumber: number): Observable<string> {
    const url = 'http://localhost:3000/api/answers/' + answerNumber;
    return this.http.delete<string>(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleting answer', "error"))
      );
  }

  // update answer
  editAnswer(answerContent: string, answerNumber: number): Observable<number> {
    const url = 'http://localhost:3000/api/answers/' + answerNumber;
    const message = { answerContent: answerContent };
    return this.http.put<number>(url, message, httpOptions)
      .pipe(
        catchError(this.handleError('updating answer', -1))
      );
  }

}
