import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarService } from '../../../shared/services/avatar.service';
import { Avatar } from '../../../shared/models/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-avatar',
  templateUrl: './register-avatar.component.html',
  styleUrl: './register-avatar.component.css'
})
export class RegisterAvatarComponent {
  public registerForm: FormGroup = this.fb.group({
    name:[''],
    email:[''],
    password:[''],
    last_name:[''],
    country:[''],
    birth_date:[''],
    pin:[''],
  });

  constructor( private fb: FormBuilder,
    private avatarService: AvatarService,
    private router: Router){}

    onRegister(){
      if (this.registerForm.valid) {
        const avatarData: Avatar = this.registerForm.value;
        console.log(avatarData)
        this.avatarService.registerAvatar(avatarData).subscribe({
          next: value =>{
            
          },
          error: err => console.error('Observable emitted an error: ' + err),
        })
      }
     
    }
}
