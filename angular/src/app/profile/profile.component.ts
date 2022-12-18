import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { AuthService } from '../shared/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService, private http: HttpClient) {}

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  preview: string = ''

  ngOnInit(): void {}

  save(formData: any): void {
    const nameInvalid = !this.profileForm.controls['name'].valid
    const emailInvalid = !this.profileForm.controls['email'].valid

    if (nameInvalid && emailInvalid) {
      this.profileForm.markAllAsTouched()
      this.profileForm.controls['name'].setErrors({})
      this.profileForm.controls['email'].setErrors({})
    } else if (nameInvalid) {
      this.profileForm.markAllAsTouched()
      this.profileForm.controls['name'].setErrors({})
    } else if (emailInvalid) {
      this.profileForm.markAllAsTouched()
      this.profileForm.controls['email'].setErrors({})
    } else {
      let formData: any = new FormData()
      formData.append('name', this.profileForm.get('name')?.value)
      formData.append('email', this.profileForm.get('email')?.value)
      this.http
        .post('http://localhost:4000/api/create-user', formData)
        .subscribe({
          next: (response: any) => console.log(response),
          error: (error: any) => console.log(error),
        })
    }
  }

  onLogout() {
    console.log('Logout')
    this.authService.signOut()
  }
}
