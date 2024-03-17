import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from '../../../shared/services/video.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { Video } from '../../../shared/models/video';

@Component({
  selector: 'app-edit-video-page',
  templateUrl: './edit-video-page.component.html',
  styleUrl: './edit-video-page.component.css'
})
export class EditVideoPageComponent implements OnInit{

  public editForm: FormGroup = this.fb.group({});
  video?: Video = undefined;
  constructor( private fb: FormBuilder,
    private videoService: VideoService,
    private authService: AuthService,
    private router: Router){
      this.video = this.router.getCurrentNavigation()?.extras.state;
    }

    ngOnInit(): void {
      this.createEditFormGroup();
    }

    onEdit(){
      if (this.editForm.valid) {
        let videoData: Video = this.editForm.value;
        this.videoService.editVideo(videoData).subscribe({
          next: value =>{
            Swal.fire({
              title: "Listo!",
              text: "El video se edito correctamente!",
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
              text: "El video no se pudo editar",
            });
          }
        })
      }
    }

    createEditFormGroup(): void {
      this.editForm = this.fb.group({
        video_name:[this.video?.video_name],
        url:[this.video?.url],
        id:[this.video?.id],
        play_list_id:[this.video?.play_list_id],
      });
    }

    onClickBack(event: any){
      this.router.navigate(['/videos']);
    }

    onDelete(event: any){
      Swal.fire({
        title: "El video se eliminara, esta usted seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteVideo();
        }
      });
    }

    deleteVideo(){
      this.videoService.deleteVideo(this.video?.id!).subscribe({
        next: value =>{
          Swal.fire({
            title: "Listo!",
            text: "El video se elimino correctamente!",
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
            text: "El video no se pudo eliminar",
          });
        }
      })
    }

}
