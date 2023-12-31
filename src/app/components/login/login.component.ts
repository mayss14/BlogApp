import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
    ],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {}

  get username() {
    return this.loginForm.controls['username'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  loginUser() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username as string, password as string).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          sessionStorage.setItem('username', username as string);
          this.router.navigate(['/home']);
        } else {
          this.msgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'username  or password is wrong',
          });
        }
      },
      (error) => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );

    /* this.authService.getUserByUname(username as string).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          sessionStorage.setItem('username', username as string);
          this.router.navigate(['/home']);
        } else {
          this.msgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'username  or password is wrong',
          });
        }
      },
      (error) => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      }
    );*/
  }
}
