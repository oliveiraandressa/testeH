const express = require('express')
//const path = require('path')
const PORT = process.env.PORT || 5000



 // const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000
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

//musicas
router.get('/musicas/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM musicas' + filter, res);
});
router.delete('/musicas/:id', (req, res) =>{
    execSQLQuery('DELETE FROM musicas WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/musicas', (req, res) =>{
    const nome = req.body.nome;
    const cantor = req.body.cantor;
    const url = req.body.url;
    const observacoes = req.body.observacoes;
    execSQLQuery(`INSERT INTO musicas (nome, cantor, url, observacoes) VALUES ('${nome}','${cantor}','${url}','${observacoes}')`, res);
});
router.patch('/musicas/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome;
    const cantor = req.body.cantor;
    const url = req.body.url;
    const observacoes = req.body.observacoes;
    execSQLQuery(`UPDATE musicas SET nome='${nome}', cantor='${cantor}', url='${url}' , observacoes='${observacoes}' WHERE ID=${id}`, res);
});

//detalhes Musicais
router.get('/detalhesMusicais/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM detalhesMusicais' + filter, res);
});
router.delete('/detalhesMusicais/:id', (req, res) =>{
  execSQLQuery('DELETE FROM detalhesMusicais WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/detalhesMusicais', (req, res) =>{
  const nome = req.body.nome;
  const minutagem = req.body.minutagem;
  const tipo = req.body.tipo;
  const secaoMusica = req.body.secaoMusica;
  execSQLQuery(`INSERT INTO detalhesMusicais (nome, minutagem, tipo, secaoMusica) VALUES('${nome}','${minutagem}','${tipo}','${secaoMusica}')`, res);
});
router.patch('/detalhesMusicais/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const minutagem = req.body.minutagem;
  const tipo = req.body.tipo;
  const secaoMusica = req.body.secaoMusica;
  execSQLQuery(`UPDATE detalhesMusicais SET nome='${nome}', minutagem='${minutagem}', tipo='${tipo}' , secaoMusica='${secaoMusica}' WHERE ID=${id}`, res);
});

//detalhes Tecnicos
router.get('/detalhesTecnicos/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM detalhesTecnicos' + filter, res);
});
router.delete('/detalhesTecnicos/:id', (req, res) =>{
  execSQLQuery('DELETE FROM detalhesTecnicos WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/detalhesTecnicos', (req, res) =>{
  const nome = req.body.nome;
  execSQLQuery(`INSERT INTO detalhesTecnicos (nome) VALUES('${nome}')`, res);
});
router.patch('/detalhesTecnicos/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  execSQLQuery(`UPDATE detalhesTecnicos SET nome='${nome}' WHERE ID=${id}`, res);
});

//detalhes Tecnicos da Musica
router.get('/detalhesTecnicosMusica/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM detalhesTecnicosMusica' + filter, res);
});
router.delete('/detalhesTecnicosMusica/:id', (req, res) =>{
  execSQLQuery('DELETE FROM detalhesTecnicosMusica WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/detalhesTecnicosMusica', (req, res) =>{
  const nome = req.body.nome;
  const musica = req.body.musica;
  const tipo = req.body.tipo;
  const valor = req.body.valor;
  execSQLQuery(`INSERT INTO detalhesTecnicosMusica (nome, musica, tipo, valor) VALUES('${nome}','${musica}','${tipo}','${valor}')`, res);
});
router.patch('/detalhesTecnicosMusica/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const musica = req.body.musica;
  const tipo = req.body.tipo;
  const valor = req.body.valor;
  execSQLQuery(`UPDATE detalhesTecnicosMusica SET nome='${nome}', musica='${musica}', tipo='${tipo}' , valor='${valor}' WHERE ID=${id}`, res);
});

//tipo detalhe
router.get('/tiposDetalhe/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM tiposDetalhe' + filter, res);
});
router.delete('/tiposDetalhe/:id', (req, res) =>{
  execSQLQuery('DELETE FROM tiposDetalhe WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/tiposDetalhe', (req, res) =>{
  const nome = req.body.nome;
  const categoria = req.body.categoria;
  execSQLQuery(`INSERT INTO tiposDetalhe (nome, categoria) VALUES('${nome}','${categoria}')`, res);
});
router.patch('/tiposDetalhe/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  const categoria = req.body.categoria;
  execSQLQuery(`UPDATE tiposDetalhe SET nome='${nome}', categoria='${categoria}' WHERE ID=${id}`, res);
});

//categoria
router.get('/categorias/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM categorias' + filter, res);
});
router.delete('/categorias/:id', (req, res) =>{
  execSQLQuery('DELETE FROM categorias WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/categorias', (req, res) =>{
  const nome = req.body.nome;
  execSQLQuery(`INSERT INTO categorias (nome) VALUES('${nome}')`, res);
});
router.patch('/categorias/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  execSQLQuery(`UPDATE tiposDetalhe SET nome='${nome}' WHERE ID=${id}`, res);
});

//secoes
router.get('/secoes/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM secoes' + filter, res);
});
router.delete('/secoes/:id', (req, res) =>{
  execSQLQuery('DELETE FROM secoes WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/secoes', (req, res) =>{
  const nome = req.body.nome;
  execSQLQuery(`INSERT INTO secoes (nome) VALUES('${nome}')`, res);
});
router.patch('/secoes/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const nome = req.body.nome;
  execSQLQuery(`UPDATE secoes SET nome='${nome}' WHERE ID=${id}`, res);
});

//secoes Musica
router.get('/secoesMusica/:id?', (req, res) =>{
  let filter = '';
  if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
  execSQLQuery('SELECT * FROM secoesMusica' + filter, res);
});
router.delete('/secoesMusica/:id', (req, res) =>{
  execSQLQuery('DELETE FROM secoesMusica WHERE ID=' + parseInt(req.params.id), res);
});
router.post('/secoesMusica', (req, res) =>{
  const secao = req.body.secao;
  const musica = req.body.musica;
  execSQLQuery(`INSERT INTO secoesMusica (secao, musica) VALUES('${secao}','${musica}')`, res);
});
router.patch('/secoesMusica/:id', (req, res) =>{
  const id = parseInt(req.params.id);
  const secao = req.body.secao;
  const musica = req.body.musica;
  execSQLQuery(`UPDATE secoesMusica SET secao='${secao}', musica='${musica}' WHERE ID=${id}`, res);
});


//inicia o servidor
//app.listen(port);
console.log('API funcionando!');
//express()
  //.use(express.static(path.join(__dirname, 'public')))
  //.set('views', path.join(__dirname, 'views'))
 // .set('view engine', 'ejs')
 // .get('/', (req, res) => res.render('pages/index'))
  //.listen(PORT, () => console.log(`Listening on ${ PORT }`))
express()
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

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
