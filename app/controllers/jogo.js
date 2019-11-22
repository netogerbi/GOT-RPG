module.exports.jogo = async function (app, req, res) {

  if (req.session.authorized !== true) {
    res.status(401).send("Não autorizado!")
    return
  }
  const db = app.config.dbConnection
  const jogoDao = new app.app.models.JogoDAO(db)

  const gameParams = await jogoDao.iniciarJogo({ usuario: req.session.usuario })

  res.render('jogo', { casa: req.session.casa, gameParams: gameParams })
  
}

module.exports.sair = function (app, req, res) {

  req.session.destroy(function (error) {
    res.render('index', { invalid: {} })
  })

}

module.exports.suditos = function (app, req, res) {
  res.render('aldeoes', { invalid: {} })
}

module.exports.pergaminhos = function (app, req, res) {
  res.render('pergaminhos', { invalid: {} })
}

module.exports.ordenarAcaoSudito = function (app, req, res) {
  const formData = req.body;

  req.assert('acao', 'A ação deve ser informada').notEmpty();
  req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();


  const errors = req.validationErrors();

  if (errors) {
    res.redirect('jogo');
    return;
  }

  console.log(errors, formData);
  res.send('OKKKKKK');
}