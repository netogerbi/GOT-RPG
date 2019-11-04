function UsuariosDAO(db) {
  this._conn = db()
}

UsuariosDAO.prototype.inserirUsuario = function (usuarioDTO) {
  this._conn.open(function(error, client) {
    
    client.collection('usuarios', function (error, collection){
      collection.insert(usuarioDTO)

      client.close();
    })
  })
}

UsuariosDAO.prototype.auth = function (userDto, req, res) {

  
  this._conn.open(function(error, client) {
    
    client.collection('usuarios', function (error, collection){
      const users = collection.find(userDto).toArray(function(error, result) {
        console.log(result)
      
        // create session var authorized
        // all the logic below must be moved to controller
        if (result[0] !== undefined) {
          req.session.authorized = true
        }

        if (req.session.authorized === true) {
          res.send('user ok')
        } else {
          res.send('user not ok')
        }
      
      })

      client.close();
    })
  })
}

module.exports = () => UsuariosDAO