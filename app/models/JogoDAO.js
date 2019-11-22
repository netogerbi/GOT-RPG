function JogoDAO(db) {
  this._conn = db()
}

JogoDAO.prototype.gerarParametros = function(userDTO) {

  this._conn.open(function (error, client) {

    client.collection('jogo', function (error, collection) {
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

JogoDAO.prototype.iniciarJogo = async function(userDTO) {

  console.log('Recuperando parametros do jogo')

  try {

    const client = await this._conn.open();
    const collection = await client.collection('jogo')
    const resultSet = await collection.find(userDTO).toArray()
    client.close();
    return resultSet[0]

  } catch (error) {

    console.log(error)
  
  }
  
}
module.exports = () => JogoDAO