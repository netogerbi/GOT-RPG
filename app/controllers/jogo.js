module.exports.jogo = async function (app, req, res) {

  if (req.session.authorized !== true) {
    res.status(401).send("Não autorizado!")
    return
  }

  const db = app.config.dbConnection;
  const jogoDao = new app.app.models.JogoDAO(db);

  let invalid = 0;
  if (req.query.invalid)
    invalid = req.query.invalid;

  const gameParams = await jogoDao.iniciarJogo({ usuario: req.session.usuario })

  res.render('jogo', { casa: req.session.casa, gameParams, invalid })
  
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

module.exports.pergaminhos = function (app, req, res) {
  
  if (req.session.authorized !== true) {
    res.status(401).send("Não autorizado!")
    return
  }
  
  res.render('pergaminhos', { invalid: {} })
}

module.exports.ordenarAcaoSudito = function (app, req, res) {
  
  req.assert('acao', 'A ação deve ser informada').notEmpty();
  req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.redirect('jogo?invalid=1');
    return;
  }

  const conn = app.config.dbConnection;
  const jogoDao = new app.app.models.JogoDAO(conn);

  const formData = req.body;

  formData.usuario = req.session.usuario;

  const tempoDasAcoes = [ 1, 2, 5, 5 ];
  formData.terminaEm = tempoDasAcoes[ formData.acao - 1 ] * 60 * 60000;

  jogoDao.salvarAcao(formData);

  res.send('OKKKKKK');
}