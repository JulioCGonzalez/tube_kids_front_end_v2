import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { Video } from '../../../shared/models/video';
import { PlayListService } from '../../../shared/services/play-list.service';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrl: './video-page.component.css'
})
export class VideoPageComponent implements OnInit{

  user?: User = undefined;
  videos?: Video[] = [];
  loading: boolean = false;
  playlistid?:string = undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
    private playListService: PlayListService,
    private route: ActivatedRoute){
      this.user = this.authService.currentUserLog;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistid = params['id'];
      // Now you can use this.videoId in your component
    });
    this.loadVideos();
  }
  
  loadVideos(){
    this.loading = true;
    this.playListService.getPlayList().subscribe({
      next: value =>{
        this.videos = value.videos;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error('Observable emitted an error: ' + err);
      }
    })
  }

  onRegister(event: any){
    this.router.navigate(['/videos/register']);
  }

  onClickVideo(video: Video){
    this.router.navigate(['/videos/edit'], { state: video });
  }

  getYoutubeThumbnail(url: string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
        const videoId = match[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        return thumbnailUrl;
    } else {
        return 'assets/avatars/videoImage.png';
    }
}
}
