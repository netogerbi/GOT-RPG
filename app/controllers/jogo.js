module.exports.jogo = function (app, req, res) {
  
  if (req.session.authorized === true) {
    res.render('jogo')
  } else {
    res.status(401).send("Não autorizado!")
  }
  
}

module.exports.sair = function (app, req, res) {
  
  req.session.destroy( function(error) {
    res.render('index', { invalid: {} })
  })
  
}