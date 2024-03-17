import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlayList } from '../models/playList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getPlayList(): Observable<PlayList> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<PlayList>(`${this.baseUrl}/api/playlists`, { headers });
  }
}
