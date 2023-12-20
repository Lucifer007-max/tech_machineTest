import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
  imports: [CommonModule,  RouterModule , MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatCheckboxModule  , FormsModule,
    ReactiveFormsModule,],
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  formData: any = FormGroup;
  loading:boolean = false;
  password: string = '';
  hidePassword: boolean = true;
  hidePassword2: boolean = true;

  constructor(private API: ApiService, private FB: FormBuilder, private router:  Router) {  }
  ngOnInit(): void {
    {
      this.formData = this.FB.group({
        name: ['', Validators.required ],
        email: ['', Validators.required ],
        password: ['', Validators.required],
        cpassword: ['', Validators.required],
      })
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  togglePasswordVisibility2() {
    this.hidePassword2 = !this.hidePassword2;
  }
  handleSignUp(e:Event) {
    e.preventDefault();
    this.loading = true;
    const JsonBody = {
      "name": this.formData.value.name,
      "email": this.formData.value.email,
      "password": this.formData.value.password,
      "cpassword": this.formData.value.cpassword,
      "type": 'register'
    }
    if (this.formData.value.password !== this.formData.value.cpassword) {
      this.loading = false;
     this.API.ErrorSnackbar('Passwords do not match');
     return;
  }else {
      this.API.auth(JsonBody).subscribe((res: any) => {
        this.loading = false;
        if(res['success'] == false) {
          this.API.ErrorSnackbar(res['message'] )
        }else {
          this.API.SuccessSnackbar(res['message']);
          this.router.navigate(['/'])
        }
      },(err:any) => {
        this.loading = false;
        this.API.ErrorSnackbar(err)
      })
    }

  }
}
