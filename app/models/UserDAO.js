function UserDAO(db) {
  this._conn = db()
}

UserDAO.prototype.inserirUsuario = function (usuarioDTO) {
  this._conn.open(function (error, client) {

    client.collection('usuarios', function (error, collection) {
      collection.insert(usuarioDTO)

      client.close();
    })
  })
}

UserDAO.prototype.auth = async function (userDto) {

  try {

    const client = await this._conn.open();
    const collection = await client.collection('usuarios')
    const resultSet = await collection.find(userDto).toArray()
    return resultSet[0]

  } catch (error) {

    console.log(error)
  
  }
    
}

module.exports = () => UserDAO