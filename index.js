const express = require('express')
const PORT = process.env.PORT || 5000

express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const app = express();         
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql');
const cors = require('cors');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  app.use('/', router);
  next();
});
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

  
//inicia o servidor

// express()
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'sql10.freesqldatabase.com',
    port     : 3306,
    user     : 'sql10506223',
    password : 'aqplvWFQSx',
    database : 'sql10506223'
  });

  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}



//musicas
router.get('/musicas/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM musicas' + filter, res);
});