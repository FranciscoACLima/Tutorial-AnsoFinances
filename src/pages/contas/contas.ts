import { Component } from '@angular/core';
import { Toast } from 'ionic-native';

import { ModalController, AlertController, NavController} from 'ionic-angular';
import { DAOContas } from '../../app/dao/dao-contas';
import { ModalContasPage} from '../modal-contas/modal-contas';

@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html'
})
export class ContasPage {
  dao: any;
  listContas: any;
  modalCtrl: any;
  alertCtrl: any;
  navCtrl: any;

  constructor(
    modalCtrl: ModalController,
    alertCtrl: AlertController,
    navCtrl: NavController
  ) {
    this.modalCtrl = modalCtrl;
    this.alertCtrl = alertCtrl;
    this.navCtrl = navCtrl;
    this.dao = new DAOContas;
    this.dao.getList((lista) => {
      this.listContas = lista;
    });
  }

  insert() {
    let modal = this.modalCtrl.create(ModalContasPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.dao.insert(data, (data) => {
          this.listContas.push(data);
          Toast.showShortBottom("Conta Inserida Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      }
    });
    modal.present();
  }

  edit(conta) {
    let modal = this.modalCtrl.create(ModalContasPage, {parametro: conta});
    modal.onDidDismiss(data => {
      if (data) {
        this.dao.edit(data, (data) => {
          Toast.showShortBottom("Conta Alterada Com Sucesso !").subscribe(
            toast => {
              console.log(toast);
            });
        });
      } else {
        this.dao.getList((lista) => {
          this.listContas = lista;
        });
      }
    });
    modal.present();
  }

  delete(conta) {
    let confirm = new this.alertCtrl.create({
      title: 'Excluir Conta',
      message: "Gostaria realmente de excluir a conta: " + conta.descricao + "?",
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.dao.delete(conta, (data) => {
              let pos = this.listContas.indexOf(data);
              this.listContas.splice(pos, 1);
              Toast.showShortBottom("Conta Excluída Com Sucesso !").subscribe(
                toast => {
                  console.log(toast);
                });
            });
          }
        },
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão Cancelada');
          }
        },
      ]
    });
    this.navCtrl.push(confirm);
  }

}
