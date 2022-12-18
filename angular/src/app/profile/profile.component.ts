import { Component, OnInit } from '@angular/core'
import { AuthService } from '../shared/services/auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment'

type FormData = {
  phoneNumber: string
  name: string
  email: string
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService, public http: HttpClient) {}

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  preview: string = ''
  isLoading = true
  saved = false

  ngOnInit(): void {
    this.getUser()
  }

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
      let postData = <FormData>{
        phoneNumber: this.authService.phoneNumber,
        name: this.profileForm.get('name')?.value,
        email: this.profileForm.get('email')?.value,
        uid: this.authService.uid,
      }
      console.log(postData)
      this.updateUser(postData)
    }
  }

  updateUser(postData: FormData) {
    let params = new HttpParams().set('uid', this.authService.uid)
    this.http
      .post(environment.functionUrl + '/users', postData, { params: params })
      .subscribe({
        next: (response: any) => {
          console.log(response)
          alert('Profile saved')
        },
        error: (error: any) => {
          console.log(error)
          alert('Error')
        },
      })
  }

  getUser() {
    let params = new HttpParams().set('uid', this.authService.uid)
    this.http
      .get(environment.functionUrl + '/users', { params: params })
      .subscribe({
        next: (response: any) => {
          console.log(response)
          this.profileForm.setValue({
            name: response.name ?? null,
            email: response.email ?? null,
          })
          this.isLoading = false
        },
        error: (error: any) => console.log(error),
      })
  }

  onLogout() {
    console.log('Logout')
    this.authService.signOut()
  }
}
