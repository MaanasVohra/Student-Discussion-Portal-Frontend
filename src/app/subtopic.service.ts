import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Subtopic } from './subtopic';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  addSubtopic(inputSubtopic: Subtopic): Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/subtopics", inputSubtopic, httpOptions)
      .pipe(
        tap(function (response: any) {
          response = of(response);
        }),
        catchError(this.handleError<any>('Adding a new subtopic'))
    )
  }
}
