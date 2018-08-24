import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Entity} from '../models/entity';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable()
export class Endpoint<T extends Entity>  {
  public type: string;
  public baseUrl: string;

  constructor( private http: HttpClient, type: string, baseUrl: string) {
    this.type = type;
    this.baseUrl = baseUrl;
  }

  httpGetAll() : Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl)
      .pipe(
        tap( items => this.log(`fetched ${this.type}s`)),
        catchError(this.handleError(`[GET] all ${this.type}s`, [] ))
      );
  }

  httpGet(id: number) : Observable<T> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<T>(url).pipe(
      tap( _ => this.log(`fetched ${this.type} id=${id}`)),
      catchError(this.handleError<T>(`[GET] ${this.type} ${id}`))
    );
  }

  httpPut(entity: T) : Observable<any> {
    return this.http.put(this.baseUrl, entity, httpOptions).pipe(
      tap(_ => this.log(`updated ${this.type} id=${entity.id}`)),
      catchError(this.handleError<any>(`[PUT] ${this.type}`))
    );
  }

  httpPost(entity: T) : Observable<T> {
    return this.http.post<T>(this.baseUrl, entity, httpOptions).pipe(
      tap((character: T) => this.log(`added ${this.type} w/ name=${entity.name}, id=${character.id}`)),
      catchError(this.handleError<T>('[POST] T'))
    );
  }

  httpDelete(entity: T | number) : Observable<T> {
    const id = typeof entity === 'number' ? entity : entity.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<T>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted character id=${id}`)),
      catchError(this.handleError<T>(`[DELETE] T ${id}`))
    );
  }

  protected handleError<T> (operation = 'operation', result?: T) {
    return (error: any) : Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  protected log(message: string) {
    console.log( `${this.type}sService: ${message}` );
  }
}
