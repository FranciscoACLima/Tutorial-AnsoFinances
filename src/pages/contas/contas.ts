import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';
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

  constructor(modalCtrl: ModalController) {
    this.modalCtrl = modalCtrl;
    this.dao = new DAOContas;
    this.dao.getList((lista) => {
      this.listContas = lista;
    });
  }

  insert() {
    let modal = this.modalCtrl.create(ModalContasPage);
    modal.onDidDismiss(data => {
      this.dao.insert(data, (data) => {
        this.listContas.push(data);
      });
    });
    modal.present();
  }

  edit(conta) {
    let modal = this.modalCtrl.create(ModalContasPage, {parametro: conta});
    modal.onDidDismiss(data => {
      this.dao.edit(data, (data) => {
      });
    });
    modal.present();
  }

  delete(conta) {
    this.dao.delete(conta, (data) => {
      let pos = this.listContas.indexOf(data);
      this.listContas.splice(pos, 1);
    });
  }

}
