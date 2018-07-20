import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})

export class DeleteAccountComponent implements OnInit {

  form;
  
  constructor(private fb: FormBuilder, private auth: AuthService){
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  deleteAccount(){
    this.auth.deleteAccount(this.form.value);
  }  

}
