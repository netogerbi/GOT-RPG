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

module.exports = () => UsuariosDAO