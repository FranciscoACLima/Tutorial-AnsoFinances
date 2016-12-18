import {SQLite} from 'ionic-native';

export class DAOContas {

  database: any;

  constructor() {
    this.database = new SQLite();
    let createSql = "CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT )";
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

  }

  getList(sucessCallBack) {
    let database = new SQLite();
    let sqlQuery = "SELECT * FROM contas";
    let list = [];
    database.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      database.executeSql(sqlQuery, []).then((data) => {
      console.log("Qtde de Registros: " + JSON.stringify(data.length));
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let item = {
            id:"",
            descricao: ""
          };
          item.id = data.rows.item(i).id;
          item.descricao = data.rows.item(i).descricao
          list.push(item);
        }
        sucessCallBack(list);
      }

    }, (error) => {
      console.log("ERRO na leitura da Tabela: " + JSON.stringify(error));
    });
  }, (error) => {
    console.error("Erro na abertura do banco de dados", error);
  });
}

  insert(conta, sucessCallBack) {
    let sqlQuery = "INSERT INTO contas (descricao) VALUES (?)";
    this.database.executeSql(sqlQuery, [conta.descricao]).then((data) => {
        conta.id = data.insertId;
        sucessCallBack(conta);
    }, (error) => {
        console.log("Erro na inserção da Conta: " + JSON.stringify(error.err));
    });
  }

  edit(conta, sucessCallBack) {
    let sqlQuery = "UPDATE contas SET descricao = ? WHERE id = ?";
    this.database.executeSql(sqlQuery, [conta.descricao, conta.id]).then((data) => {
        conta.id = data.insertId;
        sucessCallBack(conta);
    }, (error) => {
        console.log("ERRO na atualização da Conta: " + JSON.stringify(error.err));
    });
  }

  delete(conta, sucessCallBack) {
    let sqlQuery = "DELETE FROM contas WHERE id = ?";
    this.database.executeSql(sqlQuery, [conta.id]).then((data) => {
        sucessCallBack(conta);
    }, (error) => {
        console.log("ERRO na exclusão da Conta: " + JSON.stringify(error.err));
    });
  }
}
