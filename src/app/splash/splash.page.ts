import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  constructor(private navCtrl: NavController) {
    setTimeout(() => {
      const audio = new Audio('../../assets/sounds/correct.mp3');
      audio.play();
    }, 900);

    setTimeout(() => {
      navCtrl.navigateRoot('/login');
      history.pushState(null, '');
    }, 2100);
  }

}
