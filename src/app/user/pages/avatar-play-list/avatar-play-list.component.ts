import { Component } from '@angular/core';
import { Avatar } from '../../../shared/models/avatar';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Video } from '../../../shared/models/video';

@Component({
  selector: 'app-avatar-play-list',
  templateUrl: './avatar-play-list.component.html',
  styleUrl: './avatar-play-list.component.css'
})
export class AvatarPlayListComponent {
  avatar?: Avatar = undefined;
  user?: User = undefined;
  videos?: Video[] = undefined;
  selectedVideo?: Video = undefined;
  showVideoModal?: boolean= false;
  constructor(private route: Router,
    private authService: AuthService,) {
    this.avatar = this.route.getCurrentNavigation()?.extras.state;
    this.user = this.authService.currentUserLog;
    this.videos = this.user!.play_lists? this.user!.play_lists[0].videos : [];
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
  }

}
