const mongo = require('mongodb')

const mongoDbConnection =  function () {

  console.log('Connected to mongo database')

  const db = new mongo.Db(
    'got',
    new mongo.Server(
      '127.0.0.1',
      27017,
      {}
    ),
    {}
  )

  return db
}

module.exports = () => mongoDbConnection