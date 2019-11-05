module.exports.cadastro = function(app, req, res) {
  res.render('cadastro', { invalid: {}, formData: {} } )
}

module.exports.cadastrar = function(app, req, res) {

  const formData = req.body

  req.assert('nome', 'Nome não pode ser vazio').notEmpty()
  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
  req.assert('senha', 'Senha não pode ser vazio').notEmpty()
  req.assert('casa', 'Casa não pode ser vazio').notEmpty()

  const errors = req.validationErrors()
  if(errors) {
    res.render('cadastro' , { invalid: errors, formData: formData });
    return;
  }

  const db = app.config.dbConnection

  const usuariosDAO = new app.app.models.UserDAO(db)
  usuariosDAO.inserirUsuario(formData)


  const jogosDAO = new app.app.models.JogoDAO(db)
  jogosDAO.gerarParametros(formData)
  
  res.send('cadastro ok')
}