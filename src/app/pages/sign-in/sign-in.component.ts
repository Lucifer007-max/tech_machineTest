import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule,  RouterModule , MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatCheckboxModule  , FormsModule,
    ReactiveFormsModule,],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export  class SignInComponent implements OnInit {
  formData: any = FormGroup;
  loading:boolean = false;
  password: string = '';
  hidePassword: boolean = true;

  constructor(private API: ApiService, private FB: FormBuilder, private router:  Router) {
    var a = sessionStorage.getItem('id');
    if(a){
      // addhas
      this.router.navigate(['/dashboard'])
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit(): void {
    {
      this.formData = this.FB.group({
        email: ['', Validators.required ],
        password: ['', Validators.required],
        rememberMe: [false]
      })
    }
    const savedLoginDetails = this.API.getSavedLoginDetails();
    if (savedLoginDetails) {
      // alert();
      this.formData.setValue({
        email: savedLoginDetails.email,
        password: savedLoginDetails.password,
        rememberMe: true
      });
    }
  }

  handleLogin(e:Event) {
    e.preventDefault();
    this.loading = true;
    const JsonBody = {
      "email": this.formData.value.email,
      "password": this.formData.value.password,
      "type": 'login'
    }
    this.API.auth(JsonBody).subscribe((res: any) => {
      this.loading = false;
      if(res['success'] == false) {
        this.API.ErrorSnackbar(res['message'] )
        localStorage.clear()
      }else {
        if (this.formData.value.rememberMe) {
          this.API.saveLoginDetails(JsonBody);
        }else {
          localStorage.clear()
        }
        this.API.SuccessSnackbar(res.message);
        sessionStorage.setItem('id' , res.data.id)
        sessionStorage.setItem('name' , res.data.name)
        this.router.navigate(['/dashboard'])
      }
    },(err:any) => {
      this.loading = false;
      this.API.ErrorSnackbar(err)
    })
  }
}
