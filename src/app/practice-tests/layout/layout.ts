import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  constructor(private router: Router) {}
 
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
