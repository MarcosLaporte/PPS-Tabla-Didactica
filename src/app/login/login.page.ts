import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { ToastError, ToastSuccess } from '../utils';
import { SignupPage } from '../signup/signup.page';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(
    private auth: AuthService,
    public navCtrl: NavController,
    private spinner: NgxSpinnerService
  ) { }

  async login() {
    this.spinner.show();
    try {
      await this.auth.signInToFirebase(this.email, this.password)

      this.email = "";
      this.password = "";
      this.spinner.hide();
      ToastSuccess.fire('Operación realizada con éxito.');
      this.navCtrl.navigateBack('/home')
    } catch (error: any) {
      this.spinner.hide();
      ToastError.fire('Ups! Algo salió mal.', error.message);
    }
  }

  quickUserNum: number = -1;
  readonly quickUsers: { email: string, pass: string }[] = [
    { email: 'admin@admin.com', pass: '111111' },
    { email: 'invitado@invitado.com', pass: '222222' },
    { email: 'usuario@usuario.com', pass: '333333' },
    { email: 'anonimo@anonimo.com', pass: '444444' },
    { email: 'tester@tester.com', pass: '555555' }
  ];

  quickFill() {
    this.quickUserNum = this.quickUserNum >= 4 ? 0 : this.quickUserNum + 1;

    this.email = this.quickUsers[this.quickUserNum].email;
    this.password = this.quickUsers[this.quickUserNum].pass;
  }
}
