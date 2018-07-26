import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { ExceptionHandler } from '../exception-handler/exception.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form;
  email = new FormControl('', [Validators.required, Validators.email]);
  passwword = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private auth: AuthService, private exceptionHandler: ExceptionHandler){    
    this.form = fb.group({
      email: this.email,
      password: this.passwword
    })
  }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.form.value);
  }  

}
