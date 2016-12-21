import { Component, OnInit} from '@angular/core';
import { Events } from 'ionic-angular';
import { DAOLancamentos } from '../../app/dao/dao-lancamentos';

@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html'
})
export class SaldoPage implements OnInit{

  dao: any;
  saldo: number;

  constructor(public events: Events) {
      //this.events = events;
    }

    ngOnInit() {
      this.dao = new DAOLancamentos();
      this.dao.getSaldo((saldo) => {
        this.saldo = saldo;
      });
      this.events.subscribe("saldo:updated", (saldo) => {
        this.saldo = parseFloat(saldo);
      });
    }
}
