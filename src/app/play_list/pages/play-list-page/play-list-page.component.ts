import { Component } from '@angular/core';
import { PlayList } from '../../../shared/models/playList';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { Video } from '../../../shared/models/video';
import { PlayListService } from '../../../shared/services/play-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-play-list-page',
  templateUrl: './play-list-page.component.html',
  styleUrl: './play-list-page.component.css'
})
export class PlayListPageComponent {
  user?: User = undefined;
  playlists?: PlayList[] = [];
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private playListService: PlayListService,){
      this.user = this.authService.currentUserLog;
  }

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(){
    this.loading = true;
    this.playListService.getPlaylistByUser().subscribe({
      next: value =>{
        this.playlists = value;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        console.error('Observable emitted an error: ' + err);
      }
    })
  }

  onRegister(event: any){
    this.router.navigate(['/playlists/register']);
  }

  onClickPlaylist(playlist: PlayList){
    // this.router.navigate(['/playlist/edit'], { state: playlist });
    Swal.fire({
      title: "Introduzca su pin de usuario",
      html:
        '<select id="swal-input2" class="swal2-select">' +
        '  <option value="edit">Editar</option>' +
        '  <option value="add">Agregar Video</option>' +
        '</select>',
      showCancelButton: true,
      confirmButtonText: "Ejecutar"
    }).then((result) => {
      if (result.isConfirmed) {
        const option = (<HTMLInputElement>document.getElementById('swal-input2')).value;
        if (option === "edit") {
          this.router.navigate(['/playlists/edit'], { state: playlist });
        } else if (option === "add") {
          this.router.navigate(['/videos/videos'], { state: playlist });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe de selecionar una opción",
          });
        }
      }
    });
  }

  async showOptions(){
    const { value: fruit } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        edit: "Editar",
        add: "Agregar Videos"
      },
      inputPlaceholder: "Select a fruit",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          console.log(value);
          if (value === "edit") {
            this.router.navigate(['/playlist/edit']);
          } else {
            this.router.navigate(['/videos/']);
          }
        });
      }
    });
    if (fruit) {
      console.log(fruit);
      Swal.fire(`You selected: ${fruit}`);
    }
  }

}
