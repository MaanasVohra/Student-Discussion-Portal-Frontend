import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Topic } from './topic';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  // get all topics and subtopics
  getAllTopicsAndSubtopics() : Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/api/topics?getAllSubtopics=true")
      .pipe(
        catchError(this.handleError('getTopicsAndSubtopics', []))
      );
  }

  // create a new topic
  addTopic(inputTopic : Topic) : Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/topics", inputTopic, httpOptions)
    .pipe(
      tap(function(response : any) {
        response = of(response);
      }),
      catchError(this.handleError<any>('Creation of new topic'))
    );
  } 
}
