import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { QuestionListItem } from './question-list-item';
import { Question } from './question';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // get a particular question : search by the question number
  getQuestionDetails(questionNumber: number) : Observable<Question> {
    const url = 'http://localhost:3000/api/questions/' + questionNumber;
    return this.http.get<Question>(url) 
    .pipe(
      catchError(this.handleError('get question details for a particular question', <Question>{}))
    );
  }

  // get basic info of questions for listing onto dashboard 
  getQuestionListItems(subtopicName: String) : Observable<QuestionListItem[]> {
    const url = 'http://localhost:3000/api/questions?getBasicInfo=true&subtopicName=' + subtopicName;
    return this.http.get<QuestionListItem[]>(url)
    .pipe(
      catchError(this.handleError('get question list items', []))
    );
  }

  // adding a new question for a particular subtopic
  addQuestion(inputQuestion : Question) : Observable<number> {
    return this.http.post<number>('http://localhost:3000/api/questions', inputQuestion, httpOptions)
    .pipe(
      catchError(this.handleError('adding new question', -1))
    );
  }

  // deleting a question using the question number
  deleteQuestion(questionNumber: number) : Observable<number> {
    const url = 'http://localhost:3000/api/questions/' + questionNumber; 
    return this.http.delete<number>(url, httpOptions) 
    .pipe(
      catchError(this.handleError('deleting question', -1))
    );
  }
}