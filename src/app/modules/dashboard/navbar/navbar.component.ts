import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService, CurrentUser } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser= new CurrentUser();
  user = new User();

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.init();
  }

  async init(){
    this.currentUser = await this.authService.getCurrentUser();
    this.user = await this.authService.userData;
    
  }

  public goTo(route: string){
    this.router.navigate(["/"+route]);
  }

  async LogOut(){
    await this.authService.LogOut();
  }

}
