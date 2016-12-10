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
    this.listContas = this.dao.getList();
  }

  insert() {
    let modal = this.modalCtrl.create(ModalContasPage);
    modal.onDidDismiss(data => {
      this.dao.insert(data);
    });
    modal.present();
  }

  edit(conta) {
    let modal = this.modalCtrl.create(ModalContasPage, {parametro: conta});
    modal.onDidDismiss(data => {
      this.dao.edit(data);
    });
    modal.present();
  }

  delete(conta) {
    this.dao.delete(conta);
  }

}
