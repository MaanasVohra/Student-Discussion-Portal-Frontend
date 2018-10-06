import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // creates a user during sign up 
  addUser(inputUser: User): Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/users", inputUser, httpOptions)
      .pipe(
        tap(function (response: any) {
          response = of(response);
        }),
        catchError(this.handleError<any>('Adding user'))
      );
  }

  getUser(inputUser: User): Observable<any> {
    return this.http.post<any>("http://localhost:3000/login", inputUser, httpOptions)
      .pipe(
        tap(function (response: any) {
          response = of(response);
        }),
        catchError(this.handleError<any>('Getting login data for session'))
      );
  }
}

