import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayList } from '../../../shared/models/playList';
import { PlayListService } from '../../../shared/services/play-list.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../../auth/interfaces/user.interface';
import { Avatar } from '../../../shared/models/avatar';
@Component({
  selector: 'app-edit-play-list-page',
  templateUrl: './edit-play-list-page.component.html',
  styleUrl: './edit-play-list-page.component.css'
})
export class EditPlayListPageComponent {

  editForm: FormGroup;
  user?: User = undefined;
  playlist?:PlayList;
  selectedAvatars?: Avatar[];
  constructor( private fb: FormBuilder,
    private playlistService: PlayListService,
    private authService: AuthService,
    private router: Router){
      this.user = this.authService.currentUserLog;
      this.playlist = this.router.getCurrentNavigation()?.extras.state;
      this.selectedAvatars = this.playlist?.avatars;
      this.editForm = this.fb.group({
        name:[''],
        avatars:[''],
      });
  }

 

  ngOnInit(): void {
    this.createEditFormGroup();
  }


  createEditFormGroup(): void {
    this.editForm.patchValue({
      name: this.playlist?.name,
      avatars: this.playlist?.avatars
    });
  }

  onEdit(){
    if (this.editForm.valid) {
      let data: PlayList = this.editForm.value;
      data.id = this.playlist?.id;
      this.playlistService.editPlayList(data).subscribe({
        next: value =>{
          Swal.fire({
            title: "Listo!",
            text: "El playlist se edito correctamente!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok"
          }).then((result) => {
            this.router.navigate(['/playlists']);
          });
        },
        error: err => {
          console.error('Observable emitted an error: ' + err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El playlist no se pudo editar",
          });
        }
      })
    }
  }

  onDelete(event: any) {
    Swal.fire({
      title: `El playlist ${this.playlist?.name} se eliminará, ¿está seguro?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePlaylist();
      }
    });
  }

  deletePlaylist() {
    this.playlistService.deletePlayList(this.playlist?.id!).subscribe({
      next: value => {
        Swal.fire({
          title: "Listo!",
          text: "El playlist se eliminó correctamente!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        }).then((result) => {
          this.router.navigate(['/playlists']);
        });
      },
      error: err => {
        console.error('Observable emitted an error: ' + err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El avatar no se pudo eliminar",
        });
      }
    });
  }
}
