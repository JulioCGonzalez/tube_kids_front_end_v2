import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Video } from '../models/video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  registerVideo( video: Video ):Observable<Video> {
     const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<Video>(`${ this.baseUrl }/api/videos`, video, {headers});
  }

  editVideo(video: Video): Observable<Video> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.put<Video>(`${this.baseUrl}/api/videos/${video.id}`, video, { headers });
  }
  
  deleteVideo(videoId: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<void>(`${this.baseUrl}/api/videos/${videoId}`, { headers });
  }
  
}
