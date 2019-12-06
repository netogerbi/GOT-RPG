const ObjectID = require('mongodb').ObjectID;


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
    await client.close();
    
    return resultSet[0]

  } catch (error) {

    console.log(error)
  
  }
  
}

JogoDAO.prototype.salvarAcao = async function(JogoDTO) {

  try{

    const client = await this._conn.open();
    const collection = await client.collection('acoes')
    await collection.insert(JogoDTO);
    await client.close();
  
  } catch (error) {

    console.log(error);

  }  

}


JogoDAO.prototype.atualizarMoedas = async function(jogoDTO) {
  try {
    
    const client = await this._conn.open();
    const collection = await client.collection('jogo');
    const r = collection.update(
      { usuario: jogoDTO.usuario },
      { $inc: { moeda: jogoDTO.moeda } }
    );

    console.log(r);
    await client.close()

  } catch (err) {
    console.log(err)
  }
}

JogoDAO.prototype.getAcao = async function(userDTO) {

  try{

    const client = await this._conn.open();
    const collection = await client.collection('acoes')
    const d = new Date().getTime();

    const r = await collection.find({ usuario: userDTO, terminaEm: { $gt: d } }).toArray();
    await client.close();
    return r;
  
  } catch (error) {

    console.log(error);

  }
}

JogoDAO.prototype.revogarOrdem = async function(_id) {

  try {
    
    const client = await this._conn.open();
    const collection = await client.collection('acoes');
    const r = await collection.remove({ _id: ObjectID(_id) });
    await client.close();
    return r;

  } catch (err) {

    console.log(err);

  }

}


module.exports = () => JogoDAO