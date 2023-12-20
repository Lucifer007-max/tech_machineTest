import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name:any;
  constructor(private API :  ApiService  ,private router  : Router) {

  }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')?.toString();
  }
  logout(){
    sessionStorage.clear();
    this.API.SuccessSnackbar('Logout Succesfully');
    this.router.navigate(['/'])
  }
}
