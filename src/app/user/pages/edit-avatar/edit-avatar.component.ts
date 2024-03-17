import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../auth/interfaces/user.interface';
import { Avatar } from '../../../shared/models/avatar';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.css'
})
export class EditAvatarComponent {
  avatar?: Avatar = undefined;
  constructor(private route: Router) {
    this.avatar = this.route.getCurrentNavigation()?.extras.state;
  }
}
