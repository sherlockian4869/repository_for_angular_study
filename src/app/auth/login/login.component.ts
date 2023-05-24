import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errors: any = [];
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(loginForm) {
    this.authService.login(loginForm.value).subscribe(
      (result) => {
        console.log('success');
        this.router.navigate(['/']);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.errors = err.error.error;
      }
    );
  }
}
