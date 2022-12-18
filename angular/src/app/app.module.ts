import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'

import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular'
import { AngularFireModule } from '@angular/fire/compat'

import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { AuthService } from './shared/services/auth.service'
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component'

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/profile',
  signInOptions: [
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image',
        size: 'normal',
        badge: 'bottomleft',
      },
      defaultCountry: 'SE',
      loginHint: '+46730512798',
    },
  ],
}

@NgModule({
  declarations: [AppComponent, ProfileComponent, LoginComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
