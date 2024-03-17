import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { Avatar } from '../../../shared/models/avatar';
import { AvatarService } from '../../../shared/services/avatar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.css'
})
export class EditAvatarComponent implements OnInit{
  avatar?: Avatar = undefined;
  avatars: any[] =[];
  avatarInfo?: any =  { name: 'Mujer', url: 'female.png' };
  constructor(private router: Router,
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private authService: AuthService, ) {
    this.avatars = [
      { name: 'Hombre', url: 'male.png' },
      { name: 'Mujer', url: 'female.png' },
    ];
    this.avatar = this.router.getCurrentNavigation()?.extras.state;
  }

  public editForm: FormGroup = this.fb.group({});
 
  ngOnInit(): void {
    this.createEditFormGroup();
  }

  onEdit(){
    if (this.editForm.valid) {
      let avatarData: Avatar = this.editForm.value;
      avatarData.user_id = this.authService.currentUserLog?.id;
      this.avatarService.editAvatar(avatarData).subscribe({
        next: value =>{
          Swal.fire({
            title: "Listo!",
            text: "El avatar se edito correctamente!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok"
          }).then((result) => {
            this.router.navigate(['/users/avatar']);
          });
        },
        error: err => {
          console.error('Observable emitted an error: ' + err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El avatar no se pudo editar",
          });
        }
      })
    }
  }

  createEditFormGroup(): void {
    this.editForm = this.fb.group({
      full_name:[this.avatar!.full_name],
      pin:[this.avatar!.pin],
      avatar:[this.avatar!.avatar],
      age:[this.avatar!.age],
      id:[this.avatar!.id],
      user_id:[this.avatar!.user_id],
    });
    if (this.avatar?.avatar) {
      this.avatarInfo = this.avatars.find(avatar => avatar.url === this.avatar?.avatar);
    }
  }

  onClickBack(event: any){
    this.router.navigate(['/users/avatar']);
  }

  onDelete(event: any){
    Swal.fire({
      title: `El avatar ${this.avatar?.full_name} se eliminara, esta usted seguro?`,
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAvatar();
      }
    });
  }

  deleteAvatar(){
    this.avatarService.deleteAvatar(this.avatar?.id!).subscribe({
      next: value =>{
        Swal.fire({
          title: "Listo!",
          text: "El avatar se elimino correctamente!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        }).then((result) => {
          this.router.navigate(['/users/avatar']);
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
    })
  }
}
