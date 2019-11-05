function JogoDAO(db) {
  this._conn = db()
}

JogoDAO.prototype.gerarParametros = function(userDTO) {

  this._conn.open(function (error, client) {

    client.collection('usuarios', function (error, collection) {
      collection.insert({
        usuario: userDTO,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      })
      client.close();
    })

  })

}

module.exports = () => JogoDAO