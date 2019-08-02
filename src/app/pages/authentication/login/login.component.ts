import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService, JWTLoginResponse } from '@hyperiot/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationHttpErrorHandlerService } from 'src/app/services/authentication-http-error-handler.service';
import { Handler } from 'src/app/services/models/models';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'hyt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  error: string[] = [null, null, null];

  returnUrl: String;

  loginForm: FormGroup;

  cookieValue: String;

  private key: string = "9$&hy7Ke2/";

  private encrypted;

  private decrypted;

  loading: boolean = false;

  injectedErrorState = false;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private httperrorHandler: AuthenticationHttpErrorHandlerService
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({});

    this.returnUrl = window.history.state.returnUrl || '/';

    // if (this.cookieService.check('hytUser')) {
    //   this.decrypting(this.cookieService.get('hytUser'), this.key)

    //   this.loginForm = new FormGroup({
    //     username: new FormControl(this.decrypted.toString(CryptoJS.enc.Utf8).split("&")[0], Validators.required),
    //     password: new FormControl(this.decrypted.toString(CryptoJS.enc.Utf8).split("&")[1], Validators.required),
    //     rememberMe: new FormControl(true, Validators.required)
    //   });
    // } else {
    //   this.loginForm = new FormGroup({
    //     username: new FormControl('', Validators.required),
    //     password: new FormControl('', Validators.required),
    //     rememberMe: new FormControl(false, Validators.required)
    //   });
    // }

  }

  login() {
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      res => {
        var jwtToken = <JWTLoginResponse>res;
        this.cookieService.set('HIT-AUTH', jwtToken.token, 2, '/');

        if (this.loginForm.value.rememberMe == true) {
          this.encrypting(this.loginForm.value.username + "&" + this.loginForm.value.password, this.key);
          this.cookieService.set('hytUser', this.encrypted, 28, '/');
          this.cookieValue = this.cookieService.get('hytUser');
        } else if (this.cookieService.check('hytUser')) {
          this.cookieService.delete('hytUser', '/');
        }
        this.loading = false;

        this.router.navigate([this.returnUrl]);
      },
      err => {
        let k: Handler[] = this.httperrorHandler.handleLogin(err);
        for (let e of k) {
          this.error[2] = e.message;
        }
        this.loading = false;
      }
    )
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.login()
    }
  }

  private encrypting(message: string, key: string) {
    this.encrypted = CryptoJS.AES.encrypt(message, key);
  }

  private decrypting(encrypted: string, key: string) {
    this.decrypted = CryptoJS.AES.decrypt(encrypted, key);
  }

  notValid(): boolean {
    return (
      this.loginForm.get('username').invalid ||
      this.loginForm.get('password').invalid
    )
  }

}
