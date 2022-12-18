import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular'
import { AuthService } from '../shared/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['profile'])
    }
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    console.log('signin')
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.log('error')
  }

  uiShownCallback() {
    console.log('uiShown')
  }
}
