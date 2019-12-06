module.exports.jogo = async function (app, req, res) {

  if (req.session.authorized !== true) {
    res.status(401).send("Não autorizado!")
    return
  }

  const db = app.config.dbConnection;
  const jogoDao = new app.app.models.JogoDAO(db);

  let msg = '';
  if (req.query.msg !== '')
    msg = req.query.msg;

  const gameParams = await jogoDao.iniciarJogo({ usuario: req.session.usuario })

  res.render('jogo', { casa: req.session.casa, gameParams, msg })
  
}

module.exports.sair = function (app, req, res) {
    
  req.session.destroy(function (error) {
    res.render('index', { invalid: {} })
  })

}

module.exports.suditos = function (app, req, res) {
  
  if (req.session.authorized !== true) {
    res.status(401).send("Não autorizado!")
    return
  }
  
  res.render('aldeoes', { invalid: {} })
}


module.exports.pergaminhos = async function (app, req, res) {
  
  if (req.session.authorized !== true) {
    res.status(401).send("Não autorizado!")
    return
  }

  const usuario = req.session.usuario;
  const conn = app.config.dbConnection;
  const jogoDao = new app.app.models.JogoDAO(conn);
  acoes = await jogoDao.getAcao(usuario);

  res.render('pergaminhos', { acoes });
}




module.exports.ordenarAcaoSudito = async function (app, req, res) {
  
  req.assert('acao', 'A ação deve ser informada').notEmpty();
  req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.redirect('jogo?msg=e');
    return;
  }

  const conn = app.config.dbConnection;
  const jogoDao = new app.app.models.JogoDAO(conn);

  const formData = req.body;
  formData.usuario = req.session.usuario;

  const tempoDasAcoes = [ 1, 2, 5, 5 ];
  formData.terminaEm = new Date().getTime() + (tempoDasAcoes[ parseInt(formData.acao) - 1 ] * 60 * 60000);

  const custoDasAcoes = [-2, -3, -1, -1];
  const custoTotal = (custoDasAcoes[parseInt(formData.acao) -1 ] * parseInt(formData.quantidade));
  formData.moeda = custoTotal;

  await jogoDao.salvarAcao(formData);
  await jogoDao.atualizarMoedas(formData);

  res.redirect('jogo?msg=a')
}


module.exports.revogar_acao = async function (app, req, res) {
  const id = req.query.id_acao
  const conn = app.config.dbConnection;
  const jogoDao = new app.app.models.JogoDAO(conn);

  const r = jogoDao.revogarOrdem(id);

  res.redirect('jogo?msg=d')

} 