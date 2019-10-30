module.exports.cadastro = function(app, req, res) {
  res.render('cadastro', { invalid: {}, formData: {} } )
}

module.exports.cadastrar = function(app, req, res) {

  const formData = req.body
  console.log(formData)

  req.assert('nome', 'Nome não pode ser vazio').notEmpty()
  req.assert('usuario', 'Usuário não pode ser vazio').notEmpty()
  req.assert('senha', 'Senha não pode ser vazio').notEmpty()
  req.assert('casa', 'Casa não pode ser vazio').notEmpty()

  const errors = req.validationErrors()
  if(errors) {
    res.render('cadastro' , { invalid: errors, formData: formData });
    return;
  }

  res.send('cadastro ok')
}