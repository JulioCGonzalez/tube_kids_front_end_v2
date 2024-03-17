import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { VideoService } from '../../../shared/services/video.service';
import { Video } from '../../../shared/models/video';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-video-page',
  templateUrl: './register-video-page.component.html',
  styleUrl: './register-video-page.component.css'
})
export class RegisterVideoPageComponent {

  public registerForm: FormGroup = this.fb.group({
    video_name:[''],
    url:[''],
  });

  constructor( private fb: FormBuilder,
    private videoService: VideoService,
    private authService: AuthService,
    private router: Router){}

    onRegister(){
      if (this.registerForm.valid) {
        let videoData: Video = this.registerForm.value;
        this.videoService.registerVideo(videoData).subscribe({
          next: value =>{
            Swal.fire({
              title: "Listo!",
              text: "El video se registro correctamente!",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok"
            }).then((result) => {
              this.router.navigate(['/videos']);
            });
          },
          error: err => {
            console.error('Observable emitted an error: ' + err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "El video no se pudo registrar",
            });
          }
        })
      }
    }

    onClickBack(event: any){
      this.router.navigate(['/videos']);
    }
}
