import { Component, OnInit } from '@angular/core';
import { Toast } from 'ionic-native';
import { NavController, ModalController } from 'ionic-angular';

import { ModalLancamentoPage } from '../modal-lancamento/modal-lancamento';
import { DAOLancamentos } from '../../app/dao/dao-lancamentos';

@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html'
})
export class LancamentosPage implements OnInit{

  dao: any;
  listLancamentos: any;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController
  ) {
    this.modalCtrl = modalCtrl;
    this.dao = new DAOLancamentos;
  }

  ngOnInit() {
    this.dao.getList((lista) => {
      console.log(lista);
      this.listLancamentos = lista;
    });
  }

  insert() {
    let modal = this.modalCtrl.create(ModalLancamentoPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.dao.insert(data, (data) => {
          this.listLancamentos.push(data);
          Toast.showShortBottom("Lançamento Inserido Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      }
    });
    modal.present();
  }

}
