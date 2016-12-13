import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Lancamentos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html'
})
export class LancamentosPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello LancamentosPage Page');
  }

}
