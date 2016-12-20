import {SQLite} from 'ionic-native';

export class DAOLancamentos {

  database: SQLite;

  constructor() {
    setTimeout(function() {
      this.database = new SQLite();
      let createSql = `
        CREATE TABLE IF NOT EXISTS lancamentos(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          descricao TEXT,
          valor REAL,
          data TEXT,
          conta TEXT,
          entradaSaida TEXT,
          pago TEXT)
      `;
      this.database.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.database.executeSql(createSql, {}).then((data) => {
          console.log("Tabela Criada: ", data);
        }, (error) => {
          console.error("Erro na execução do sql", error);
        })
      }, (error) => {
        console.error("Erro na abertura do banco de dados", error);
      });
    }, 1000);
  }

  getList(sucessCallBack) {
    setTimeout(function() {
      //this.database = new SQLite();
      let sqlQuery = "SELECT * FROM lancamentos";
      let list = [];
      this.database.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.database.executeSql(sqlQuery, []).then((data) => {
          console.log("Qtde de Lançamentos: " + JSON.stringify(data.length));
          console.log("Lancamentos" + JSON.stringify(data));
          if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
              let lancamento = {
              id: data.rows.item(i).id,
              descricao: data.rows.item(i).descricao,
              valor: data.rows.item(i).valor,
              data: data.rows.item(i).data,
              conta: data.rows.item(i).conta,
              entradaSaida: data.rows.item(i).entradaSaida,
              pago: data.rows.item(i).pago
              };
              list.push(lancamento);
            }
            sucessCallBack(list);
          }
        }, (error) => {
          console.log("getList() - ERRO na leitura da Tabela: " + JSON.stringify(error));
        });
      }, (error) => {
        console.error("getList() - Erro na abertura do banco de dados", error);
      });
    }, 1200);
  }

  insert(lancamento, sucessCallBack) {
    let sqlQuery = `
      INSERT INTO lancamentos(
        descricao,
        valor,
        data,
        conta,
        entradaSaida,
        pago) VALUES (?, ?, ?, ?, ?, ?)
    `;
    this.database.executeSql(sqlQuery, [lancamento.descricao, lancamento.valor, lancamento.data,
      lancamento.conta, lancamento.entradaSaida, lancamento.pago]).then((data) => {
        lancamento.id = data.insertId;
        sucessCallBack(lancamento);
    }, (error) => {
        console.log("Erro na inserção do Lançamento: " + JSON.stringify(error.err));
    });
  }

  edit(lancamento, successCallback) {
    let sqlQuery = `UPDATE lancamentos
      SET
        descricao = ?,
        valor = ?,
        data = ?,
        conta = ?,
        entradaSaida = ?,
        pago = ?
      WHERE id = ?;
    `
    this.database.executeSql(sqlQuery, [
      lancamento.descricao,
      lancamento.valor,
      lancamento.data,
      lancamento.conta,
      lancamento.entradaSaida,
      lancamento.pago,
      lancamento.id
    ]).then((data) => {
        lancamento.id = data.insertId;
        successCallback(lancamento);
    }, (error) => {
        console.log("ERRO na atualização do Lançamento: " + JSON.stringify(error.err));
    });
  }

  delete(lancamento, successCallback) {
    let sqlQuery = "DELETE FROM lancamentos WHERE id = ?";
    this.database.executeSql(sqlQuery, [lancamento.id]).then((data) => {
        successCallback(lancamento);
    }, (error) => {
        console.log("ERRO na exclusão do Lançamento: " + JSON.stringify(error.err));
    });
  }

}
