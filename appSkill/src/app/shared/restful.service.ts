import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class RestService {

    constructor(private http: HttpClient) { }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    getSkills(): Observable<any> {
        return this.http.get(endpoint + 'skills').pipe(
            map(this.extractData));
    }

    getSkillById(id): Observable<any> {
        return this.http.get(endpoint + 'products/' + id).pipe(
            map(this.extractData));
    }

    addSkill(product): Observable<any> {
        console.log(product);
        return this.http.post<any>(endpoint + 'skill', JSON.stringify(product), httpOptions).pipe(
            tap((product) => console.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<any>('addProduct'))
        );
    }

    updateSkill(id, product): Observable<any> {
        return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
            tap(_ => console.log(`updated product id=${id}`)),
            catchError(this.handleError<any>('updateProduct'))
        );
    }

    deleteSkill(skillName): Observable<any> {
        return this.http.delete<any>(endpoint + 'skill/' + skillName, httpOptions).pipe(
            tap(_ => console.log(`deleted product id=${skillName}`)),
            catchError(this.handleError<any>('deleteProduct'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}