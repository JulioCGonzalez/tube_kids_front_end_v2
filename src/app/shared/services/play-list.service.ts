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
  getPlaylistById(id:number): Observable<PlayList> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<PlayList>(`${this.baseUrl}/api/playlistbyid/${id}`, { headers });
  }
  getPlaylistByUser(): Observable<PlayList[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<PlayList[]>(`${this.baseUrl}/api/playlistsbyuser`, { headers });
  }
  registerPlayList( playlist: PlayList ):Observable<PlayList> {
    const headers = new HttpHeaders({
     Authorization: `Bearer ${localStorage.getItem('token')}`,
   });
   return this.http.post<PlayList>(`${ this.baseUrl }/api/playlists`, playlist, {headers});
 }

 editPlayList(playlist: PlayList): Observable<PlayList> {
   const headers = new HttpHeaders({
     Authorization: `Bearer ${localStorage.getItem('token')}`,
   });
   return this.http.put<PlayList>(`${this.baseUrl}/api/playlists/${playlist.id}`, playlist, { headers });
 }
 
 deletePlayList(playlistid: number): Observable<void> {
   const headers = new HttpHeaders({
     Authorization: `Bearer ${localStorage.getItem('token')}`,
   });
   return this.http.delete<void>(`${this.baseUrl}/api/playlists/${playlistid}`, { headers });
 }
}
