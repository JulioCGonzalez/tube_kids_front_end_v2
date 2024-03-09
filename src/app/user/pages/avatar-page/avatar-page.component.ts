import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar-page',
  templateUrl: './avatar-page.component.html',
  styleUrl: './avatar-page.component.css'
})
export class AvatarPageComponent {

  constructor(
    private router: Router){}

  onRgister(event: any){
    this.router.navigate(['/users/register']);
  }
}
