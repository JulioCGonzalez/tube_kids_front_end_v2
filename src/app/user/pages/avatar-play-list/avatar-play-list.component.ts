import { Component } from '@angular/core';
import { Avatar } from '../../../shared/models/avatar';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Video } from '../../../shared/models/video';
import { PlayListService } from '../../../shared/services/play-list.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-avatar-play-list',
  templateUrl: './avatar-play-list.component.html',
  styleUrl: './avatar-play-list.component.css'
})
export class AvatarPlayListComponent {
  avatar?: Avatar = undefined;
  user?: User = undefined;
  videos?: Video[] = [];
  selectedVideo?: Video = undefined;
  showVideoModal: boolean= false;
  loading: boolean = false;
  constructor(private route: Router,
    private authService: AuthService,
    private playListService: PlayListService,
    private sanitizer: DomSanitizer) {
    this.avatar = this.route.getCurrentNavigation()?.extras.state;
    this.user = this.authService.currentUserLog;
  }

  ngOnInit(): void {
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

  getYoutubeThumbnail(url: string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
        const videoId = match[1];
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        return thumbnailUrl;
    } else {
        return null;
    }
  }

  onClickVideo(video: Video) {
    this.selectedVideo = video;
    this.showVideoModal = true;
  }

  getEmbeddedVideoUrl(videoUrl: string): SafeResourceUrl  {
    if (videoUrl && videoUrl.includes('youtube.com')) {
      const videoId = videoUrl.split('v=')[1];
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
}

}
