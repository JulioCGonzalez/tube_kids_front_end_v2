import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Avatar } from '../models/avatar';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  registerAvatar( avatar: Avatar ):Observable<Avatar> {
    return this.http.post<Avatar>(`${ this.baseUrl }/api/registerAvatar`, avatar);
  }
}
