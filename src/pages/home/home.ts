import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LancamentosPage } from '../lancamentos/lancamentos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  lancamentos:any;

  constructor(public navCtrl: NavController) {
    this.lancamentos = LancamentosPage;
  }

}
