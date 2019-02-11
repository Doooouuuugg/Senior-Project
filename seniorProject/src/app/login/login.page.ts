import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public alert: AlertController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    return await alert.present()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Welcome to group study!',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  async login() {
    const { username, password } = this
    try {
      // change later
      const res = await this.afAuth.auth.signInWithEmailAndPassword(this.username, this.password)
      this.router.navigate(['/home'])
      this.presentToast();

    } catch (err) {
      console.dir(err)
      this.showAlert("Error!", "You do not have an account, please register.")
    }
  }

  register() {
    this.router.navigate(['/register'])
  }

}
