module.exports.index = function(app, req, res) {
  res.render('index', { invalid: {} })
}

module.exports.auth = function(app, req, res) {

  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
  req.assert('senha', 'Senha não pode ser vazio').notEmpty()

  const errors = req.validationErrors()
  
  if(errors) {
    res.render('index' , { invalid: errors })
    return;
  }

  const userDto = req.body
  const conn = app.config.dbConnection
  const userDao = new app.app.models.usuariosDAO(conn)
  userDao.auth(userDto, req, res)

  

  //res.send('Hello controller')
  //res.render('index')
}