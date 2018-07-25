import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  form;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    let password = fb.control('', [Validators.required]);
    let newPassword = fb.control('', [Validators.required]);
    let confirmNewPassword = fb.control('', [Validators.required]);
    this.form = fb.group({
      password: password,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword
    }, {
        validator: ChangePasswordComponent.MatchPassword // your validation method
      });
  }

  ngOnInit() {
  }

  changePassword() {
    this.auth.changePassword(this.form.value);
  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('newPassword').value; // to get value in input tag
    let confirmPassword = AC.get('confirmNewPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      console.log('false');
      AC.get('confirmNewPassword').setErrors({ MatchPassword: true })
    } else {
      console.log('true');
      return null
    }
  }

}