import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
}
