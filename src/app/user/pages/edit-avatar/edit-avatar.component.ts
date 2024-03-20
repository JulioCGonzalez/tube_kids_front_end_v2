import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Avatar } from '../../../shared/models/avatar';
import { AvatarService } from '../../../shared/services/avatar.service';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.css']
})
export class EditAvatarComponent implements OnInit {
  avatar?: Avatar = undefined;
  avatars: any[] = [];
  avatarInfo?: any = { name: 'Mujer', url: 'female.png' };
  editForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private authService: AuthService
  ) {
    this.avatars = [
      { name: 'Hombre', url: 'male.png' },
      { name: 'Mujer', url: 'female.png' },
    ];
    this.avatar = this.router.getCurrentNavigation()?.extras.state;
    this.editForm = this.fb.group({
      full_name: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      age: ['', Validators.required],
      avatar: ['']
    });
  }

  ngOnInit(): void {
    this.createEditFormGroup();
  }

  onEdit() {
    if (this.editForm.valid) {
      if (this.avatar && this.authService.currentUserLog) {
        let avatarData: Avatar = this.editForm.value;
        avatarData.user_id = this.authService.currentUserLog.id;
        avatarData.id = this.avatar.id;
        this.avatarService.editAvatar(avatarData).subscribe({
          next: value => {
            Swal.fire({
              title: "Listo!",
              text: "El avatar se editó correctamente!",
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
        });
      } else {
        console.error("No se puede editar el avatar: el avatar o el usuario actual son nulos.");
      }
    }
  }

  createEditFormGroup(): void {
    this.editForm.patchValue({
      full_name: this.avatar?.full_name,
      pin: this.avatar?.pin,
      age: this.avatar?.age,
      avatar: this.avatar?.avatar
    });

    if (this.avatar?.avatar) {
      this.avatarInfo = this.avatars.find(avatar => avatar.url === this.avatar?.avatar);
    }
  }

  onClickBack(event: any) {
    this.router.navigate(['/users/avatar']);
  }

  onDelete(event: any) {
    Swal.fire({
      title: `El avatar ${this.avatar?.full_name} se eliminará, ¿está seguro?`,
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

  deleteAvatar() {
    this.avatarService.deleteAvatar(this.avatar?.id!).subscribe({
      next: value => {
        Swal.fire({
          title: "Listo!",
          text: "El avatar se eliminó correctamente!",
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
    });
  }
}
