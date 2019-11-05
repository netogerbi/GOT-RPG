module.exports.jogo = function (app, req, res) {

  if (req.session.authorized === true) {
    console.log(req.session.casa)
    res.render('jogo', { casa: req.session.casa })
  } else {
    res.status(401).send("Não autorizado!")
  }

}

module.exports.sair = function (app, req, res) {

  req.session.destroy(function (error) {
    res.render('index', { invalid: {} })
  })

}