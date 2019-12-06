const crypto = require('crypto');

module.exports.index = function(app, req, res) {
  res.render('index', { invalid: {} })
}

module.exports.auth = async function(app, req, res) {

  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
  req.assert('senha', 'Senha não pode ser vazio').notEmpty()

  const errors = req.validationErrors()

  if(errors) {
    res.render('index' , { invalid: errors })
    return;
  }

  const userDto = req.body
  userDto.senha = crypto.createHash('md5').update(userDto.senha).digest('hex')
  const conn = app.config.dbConnection
  const userDao = new app.app.models.UserDAO(conn)
  const loggedUser = await userDao.auth(userDto)

  if (loggedUser !== undefined) {

    req.session.authorized = true
    req.session.usuario = loggedUser.usuario
    req.session.senha = loggedUser.senha
    req.session.casa = loggedUser.casa

    res.redirect('jogo')

  } else {

    req.session.authorized = false
    res.render('index', { invalid: [{ msg: 'Nome de usuário ou senha inválidos' }] })
    
  }  

}