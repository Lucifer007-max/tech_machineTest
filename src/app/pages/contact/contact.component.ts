import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone:true,
  imports: [CommonModule,  RouterModule , MatButtonModule,MatCardModule,MatInputModule, MatIconModule, MatCheckboxModule  , FormsModule,
    ReactiveFormsModule,],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formData: any = FormGroup;

  constructor(private API: ApiService, private FB: FormBuilder, private router:  Router) {  }
  ngOnInit(): void {
    {
      this.formData = this.FB.group({
        name: ['', Validators.required ],
        email: ['', Validators.required,],
        phone: ['', Validators.required,],
      })
    }
  }

  handleSubmit(e:Event) {
    e.preventDefault();
    console.log(this.formData)
    if(this.formData.status == 'VALID') {
      // localStorage.setItem('formData' , JSON.stringify(this.formData))
      this.API.SuccessSnackbar('Thanks Your Response we will reach you soon')
      // this.router.url('')
      window.location.href = 'https://techexactly.com'
      // this.router.navigateByUrl('')
    }else {
        this.API.ErrorSnackbar("All fields are required")
    }
  }

}
