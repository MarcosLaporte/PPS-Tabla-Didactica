import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces';
import { NavController } from '@ionic/angular';
import { ToastInfo } from '../utils';
import { StorageService } from '../services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare type Topic = 'colors' | 'animals' | 'numbers';
declare type Language = 'es' | 'en' | 'pt';

const colors = ['red', 'yellow', 'green', 'black', 'light-blue', 'white', 'purple', 'pink'];
const animals = ['dog', 'cat', 'cow', 'chicken', 'frog', 'lion', 'pig', 'rabbit'];
const numbers = ['number-1', 'number-2', 'number-3', 'number-4', 'number-5', 'number-6', 'number-7', 'number-8'];

declare interface Card { item: string, url: string };
declare interface TopicsCards {
  colors: Card[],
  animals: Card[],
  numbers: Card[]
};
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  protected userInSession: User | null;
  chosenTopic: Topic = 'animals';
  chosenLang: Language = 'es';
  cardsToShow: string[] = animals;

  constructor(public auth: AuthService, protected navCtrl: NavController, private storage: StorageService, private spinner: NgxSpinnerService) {
    this.userInSession = auth.UserInSession;
  }

  cardsItems: TopicsCards = { colors: [], animals: [], numbers: [] }
  async ngOnInit() {
    this.auth.userInSessionObs.subscribe((user) => this.userInSession = user);

    this.spinner.show();
    await this.getImages();
    this.spinner.hide();
  }

  private async getImages() {
    const topics: Topic[] = ['colors', 'animals', 'numbers']
    for (const topic of topics) {
      const list = await this.storage.getAllFiles('audio/' + topic);
      for (const item of list.items) {
        this.storage.getFileDownloadUrl(item.fullPath)
          .then((url) => this.cardsItems[topic].push({ item: item.name, url: url }));
      }
    }
  }

  chooseTopic(topic: Topic) {
    this.chosenTopic = topic;

    this.cardsToShow = [];
    switch (topic) {
      case 'colors':
        this.cardsToShow = colors;
        break;
      case 'animals':
        this.cardsToShow = animals;
        break;
      case 'numbers':
        this.cardsToShow = numbers;
        break;
    }

  }

  readonly getTopicImage = (): string => this.chosenTopic ? `topics/${this.chosenTopic}` : 'topics';
  readonly getLangImage = (): string => this.chosenLang ? `flags/${this.chosenLang}` : 'languages';

  isShowingCard: boolean = false;
  async pressCard(pressedCard: string) {
    if (this.isShowingCard) return;
    this.isShowingCard = true;

    const cardEls = this.cardsToShow
      .filter((card) => card !== pressedCard)
      .map((card) => document.getElementById(card));
    this.disableCards(cardEls, true);

    const cardItem: Card = this.cardsItems[this.chosenTopic]
      .filter((card) => card.item === `${pressedCard}-${this.chosenLang}.mp3`)[0];
    const audio = new Audio(cardItem.url);
    const pressedEl = document.getElementById(pressedCard)!;
    pressedEl.classList.add('active');
    audio.play();

    await this.delay(1500);

    pressedEl.classList.remove('active');
    this.disableCards(cardEls, false);

    this.isShowingCard = false;
  }

  private disableCards(cardsEl: any[], value: boolean) {
    for (const el of cardsEl)
      el.disabled = value;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  signOut() {
    this.auth.signOut();
    ToastInfo.fire('Sesión cerrada.');
    this.navCtrl.navigateBack('/login');
  }
}
