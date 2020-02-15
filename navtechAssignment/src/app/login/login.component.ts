import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public submitButton: boolean = false;

  constructor( private router: Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/)])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/)]))
    });
  }

  loginSubmit(formdata) {
    this.submitButton = true;
    if (this.loginForm.valid) {
      localStorage.setItem('userDetails', JSON.stringify(formdata));
      this.router.navigate(['order-list']);
      this.submitButton = false;
      this.loginForm.reset();
      alert("login successful!");
    }
  }

}
