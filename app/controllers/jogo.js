module.exports.jogo = function (app, req, res) {
  if (req.session.authorized === true) {
    res.render('jogo')
  } else {
    res.status(401).send("Não autorizado!")
  }
  
}