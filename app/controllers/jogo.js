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