import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, of, map, catchError } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  currentUser$: Observable<User | undefined> = this.currentUserSubject.asObservable();

  private baseUrl = environment.baseUrl;
  private user?: User = undefined;

  constructor(private http: HttpClient) { }

  get currentUserLog():User|undefined {
    if ( !this.currentUserSubject.getValue() ) return undefined;
    return structuredClone(  this.currentUserSubject.getValue() );
  }

  login( email: string, password: string ):Observable<User> {
    const body = { email, password };
    return this.http.post<User>(`${ this.baseUrl }/api/login`, body)
      .pipe(
        tap( user => {this.currentUserSubject.next(this.setUserData(user)); }),
        tap( user => {localStorage.setItem('token', user.authorization?.token?? '' ); console.log(this.getJwtDecoded(user.authorization?.token))}),
      );
  }

  me():Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<User>(`${ this.baseUrl }/api/me`, null, {headers})
      .pipe(
        tap( user => {this.currentUserSubject.next(this.refreshUserData(user)); }),
        map( user => !!this.currentUserLog),
        catchError( err => of(false))
      );
  }

  register( user:User ):Observable<User> {
    return this.http.post<User>(`${ this.baseUrl }/api/register`, user);
  }


  logout() {
    this.user = undefined;
    this.currentUserSubject.next(undefined)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    localStorage.clear();
    return this.http.post<User>(`${ this.baseUrl }/api/logout`, null, {headers})
    .pipe(
      tap( user => {this.currentUserSubject.next(undefined); }),
    );
  }

  getJwtDecoded(token: string = ''): any{
    return jwtDecode(token);
  }

  setUserData(user: any = ''): User | undefined {
    const tokenData = this.getJwtDecoded(user.authorization?.token);
    if(tokenData){
      const user: User = {
        email: tokenData.email,
        name: tokenData.name
      }
      return user;
    }
    return undefined;
  }

  refreshUserData(user: any = ''): User | undefined {
    if(user){
      const userRefreshed: User = {
        email: user.email,
        name: user.name,
        id: user.id,
        country: user.country,
        avatars: user.avatars,
        pin: user.pin,
        play_lists: user.play_lists
      }
      return userRefreshed;
    }
    return undefined;
  }
}
