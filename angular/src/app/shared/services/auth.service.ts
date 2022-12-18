import { Injectable, NgZone } from '@angular/core'
import { User } from '../services/user'
import * as auth from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
// import {
//   //AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
  ) {
    /* Saving user data in local storage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
      } else {
        localStorage.setItem('user', 'null')
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }

  // Returns true when user is logged in and has phone number
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!)
    return user !== null && user.phoneNumber !== false ? true : false
  }

  // Returns phone number if user is logged in
  get phoneNumber(): string {
    const user = JSON.parse(localStorage.getItem('user')!)
    return this.isLoggedIn ? user.phoneNumber : null
  }

  // Returns uid if user is logged in
  get uid(): string {
    const user = JSON.parse(localStorage.getItem('user')!)
    return this.isLoggedIn ? user.uid : null
  }

  // Sign out
  signOut() {
    return this.afAuth
      .signOut()
      .then(() => {
        localStorage.removeItem('user')
        this.router.navigate(['login'])
      })
      .catch((error) => {
        this.router.navigate([''])
      })
  }
}
