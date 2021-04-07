import { User } from '../users/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UserService {

  private baseUrl = 'http://localhost:8080/user'; 

  constructor(private http: HttpClient){}

  addUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl, user);
  }
  deleteUser(id: number):Observable<{}>{
    return this.http.delete(`${this.baseUrl}/${id}`)
                      .pipe(catchError(this.handleError));
  }

  updateUser(user: User){
    return this.http.put(`${this.baseUrl}/updateuser`, user)
    .pipe(catchError(this.handleError));
  }
  getAllUsers(){
    return this.http.get<User[]>(this.baseUrl)
                      .pipe(catchError(this.handleError));
  }
  getUserById(id: number){
    return this.http.get<User>(`${this.baseUrl}/${id}`)
                      .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpError.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}